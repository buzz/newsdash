import { createHash } from 'node:crypto'

import decodeIco from 'decode-ico'
import ky from 'ky'
import metascraper from 'metascraper'
import metascraperImage from 'metascraper-image'
import metascraperLogo from 'metascraper-logo'
import metascraperLogoFavicon from 'metascraper-logo-favicon'
import metascraperYoutube from 'metascraper-youtube'
import RssParser from 'rss-parser'
import sharp from 'sharp'
import { stripHtml } from 'string-strip-html'

import { IMG_HEIGHT, IMG_WIDTH, UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'
import { feedSchema } from '@newsdash/common/schema'

import { BadGateway, BadRequest, isError, NotFound, ParseError, ServerError } from '#api/errors.js'
import { FETCH_TIMEOUT, IMG_QUALITY, MAX_CONTENT_LENGTH, USER_AGENT } from '#constants'

import type { CustomFeedFields, RssParserResult } from './types.js'

const NO_TITLE = 'NO_TITLE'
const DEFAULT_FETCH_OPTIONS = {
  headers: { 'User-Agent': USER_AGENT },
  timeout: FETCH_TIMEOUT,
}

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
    language: feed.language,
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
    url.hash = ''
    return url
  } catch {
    throw new BadRequest('Malformed URL')
  }
}

async function fetchText(url: URL) {
  try {
    const response = await ky.get(url, DEFAULT_FETCH_OPTIONS)
    return response.text()
  } catch (error) {
    if (isError(error)) {
      throw new BadGateway(error.message)
    }
  }
  throw new Error(UNKNOWN_ERROR_MESSAGE)
}

async function fetchBuffer(url: URL) {
  const response = await ky.get(url, DEFAULT_FETCH_OPTIONS)

  if (!response.ok) {
    throw new BadGateway(`Fetch error: ${response.statusText}`)
  }

  return Buffer.from(await response.arrayBuffer())
}

function parseFeed(body: string) {
  try {
    return new RssParser<CustomFeedFields>().parseString(body)
  } catch (error) {
    if (isError(error)) {
      throw new ParseError(error.message)
    }
  }
  throw new Error(UNKNOWN_ERROR_MESSAGE)
}

async function scrapeUrlImage(html: string, url: URL) {
  const imageScraper = metascraper([metascraperImage(), metascraperYoutube()])
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

async function downloadImageAndResizeStream(
  url: URL,
  width: number = IMG_WIDTH,
  height: number = IMG_HEIGHT
) {
  try {
    return sharp(await fetchBuffer(url))
      .resize(width, height)
      .webp({ quality: IMG_QUALITY })
      .toBuffer()
  } catch (error: unknown) {
    if (isError(error)) {
      throw new ServerError(error.message)
    }
  }
  throw new Error(UNKNOWN_ERROR_MESSAGE)
}

async function downloadImageAndResizeIco(url: URL) {
  try {
    const buffer = await fetchBuffer(url)
    const images = decodeIco(buffer)

    let foundImg = images.find((image) => image.width === 32 && image.height === 32)

    if (!foundImg) {
      foundImg = images[0]
      for (const image of images) {
        if (image.width * image.height > foundImg.width * foundImg.height) {
          foundImg = image
        }
      }
    }

    const sharpImg =
      foundImg.type === 'png'
        ? sharp(foundImg.data)
        : sharp(foundImg.data, {
            raw: { width: foundImg.width, height: foundImg.height, channels: 4 },
          })

    return sharpImg.resize(32, 32).webp({ quality: IMG_QUALITY }).toBuffer()
  } catch (error) {
    if (isError(error)) {
      throw new BadGateway(error.message)
    }
  }
  throw new Error(UNKNOWN_ERROR_MESSAGE)
}

export {
  constructFeedResponse,
  downloadImageAndResizeIco,
  downloadImageAndResizeStream,
  fetchText,
  parseFeed,
  parseUrl,
  scrapeUrlImage,
  scrapeUrlLogo,
}
