import { createHash } from 'node:crypto'

import got, { type OptionsOfUnknownResponseBodyWrapped } from 'got'
import metascraper from 'metascraper'
import metascraperImage from 'metascraper-image'
import metascraperLogo from 'metascraper-logo'
import metascraperLogoFavicon from 'metascraper-logo-favicon'
import RssParser from 'rss-parser'
import sharp from 'sharp'
import { stripHtml } from 'string-strip-html'

import { feedSchema } from '@newsdash/schema'

import { BadGateway, BadRequest, isError, NotFound, ParseError, ServerError } from '#api/errors.js'
import {
  FETCH_TIMEOUT,
  IMG_HEIGHT,
  IMG_QUALITY,
  IMG_WIDTH,
  MAX_CONTENT_LENGTH,
  USER_AGENT,
} from '#constants'

import type { RssParserResult } from './types.js'

const NO_TITLE = 'NO_TITLE'
const DEFAULT_FETCH_OPTIONS = {
  headers: { 'User-Agent': USER_AGENT },
  method: 'GET',
  resolveBodyOnly: false,
  timeout: { request: FETCH_TIMEOUT },
} satisfies OptionsOfUnknownResponseBodyWrapped

function constructFeedResponse(result: RssParserResult) {
  const { items: resultItems, ...feed } = result

  const items = resultItems.map((item) => {
    // Generate ID if necessary
    const id =
      item.guid ??
      createHash('sha1').update(`${item.title}${item.isoDate}`).digest('base64').slice(0, 12)

    // Process content snippet
    let content = item.summary ?? item.contentSnippet ?? item.content
    if (content) {
      content = stripHtml(content).result
      content =
        content.length > MAX_CONTENT_LENGTH
          ? `${content.slice(0, Math.max(0, MAX_CONTENT_LENGTH))}…`
          : content
    }

    // TODO: image

    return {
      id,
      content,
      date: item.isoDate ?? new Date().toISOString(),
      link: item.link,
      title: item.title ?? NO_TITLE,
    }
  })

  return feedSchema.parse({
    title: feed.title ?? NO_TITLE,
    description: feed.description,
    link: feed.link,
    items,
  })
}

function parseUrl(urlString: unknown): URL {
  if (typeof urlString !== 'string') {
    throw new BadRequest('Malformed URL')
  }

  try {
    const url = new URL(urlString)
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new BadRequest('Malformed URL')
    }
    return url
  } catch {
    throw new BadRequest('Malformed URL')
  }
}

async function fetchText(url: URL) {
  try {
    const result = await got(url, DEFAULT_FETCH_OPTIONS).text()
    return result
  } catch (error) {
    if (isError(error)) {
      throw new BadGateway(error.message)
    }
  }
  throw new Error('Unknown error')
}

function fetchStream(url: URL) {
  try {
    return got.stream(url, DEFAULT_FETCH_OPTIONS)
  } catch (error) {
    if (isError(error)) {
      throw new BadGateway(error.message)
    }
  }
  throw new Error('Unknown error')
}

function parseFeed(body: string) {
  try {
    return new RssParser().parseString(body)
  } catch (error) {
    if (isError(error)) {
      throw new ParseError(error.message)
    }
  }
  throw new Error('Unknown error')
}

async function scrapeUrlImage(html: string, url: URL) {
  const imageScraper = metascraper([metascraperImage()])
  const { image: imageList } = await imageScraper({ html, url: String(url) })

  // might return comma-separated list of images
  if (imageList) {
    const imageUrl = imageList.split(',').at(0)
    if (imageUrl) {
      return imageUrl
    }
  }

  throw new NotFound()
}

async function scrapeUrlLogo(html: string, url: URL) {
  const imageScraper = metascraper([metascraperLogo(), metascraperLogoFavicon()])
  const { logo } = await imageScraper({ html, url: String(url) })
  if (logo) {
    return logo
  }

  throw new NotFound()
}

function downloadImageAndResizeStream(
  url: URL,
  width: number = IMG_WIDTH,
  height: number = IMG_HEIGHT,
  format: 'jpeg' | 'png' = 'jpeg'
) {
  try {
    let resizer = sharp().resize(width, height)
    resizer = format === 'jpeg' ? resizer.jpeg({ quality: IMG_QUALITY }) : resizer.png()
    return fetchStream(url).pipe(resizer)
  } catch (error: unknown) {
    if (isError(error)) {
      throw new ServerError(error.message)
    }
  }
  throw new Error('Unknown error')
}

export {
  constructFeedResponse,
  downloadImageAndResizeStream,
  fetchStream,
  fetchText,
  parseFeed,
  parseUrl,
  scrapeUrlImage,
  scrapeUrlLogo,
}
