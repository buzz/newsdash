import { createHash } from 'node:crypto'

import got, { type OptionsOfUnknownResponseBodyWrapped } from 'got'
import metascraper from 'metascraper'
import metascraperImage from 'metascraper-image'
import RssParser from 'rss-parser'
import sharp from 'sharp'
import { stripHtml } from 'string-strip-html'

import { feedSchema } from '@newsdash/schema'

import { BadGateway, BadRequest, isError, NotFound, ParseError, ServerError } from '#api/errors.js'
import { FETCH_TIMEOUT, IMG_HEIGHT, IMG_QUALITY, IMG_WIDTH, USER_AGENT } from '#constants'

import type { RssParserResult } from './types.js'

const MAX_CONTENT_LENGTH = 200
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
          ? content.slice(0, Math.max(0, MAX_CONTENT_LENGTH))
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

function fetchText(url: URL) {
  try {
    return got(url, DEFAULT_FETCH_OPTIONS).text()
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

function downloadImageAndResizeStream(url: URL) {
  try {
    const resizer = sharp().resize(IMG_WIDTH, IMG_HEIGHT).jpeg({ quality: IMG_QUALITY })
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
}
