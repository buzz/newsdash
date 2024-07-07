import type { FastifyPluginAsync } from 'fastify'

import { IMG_MAX_AGE } from '#constants'

import {
  constructFeedResponse,
  downloadImageAndResizeIco,
  downloadImageAndResizeStream,
  fetchText,
  parseFeed,
  parseUrl,
  scrapeUrlImage,
  scrapeUrlLogo,
} from './utils.js'
import type { UrlRequest } from './types.js'

const feedPlugin: FastifyPluginAsync = (app) => {
  app.get('/parse', async (request: UrlRequest, reply) => {
    const url = parseUrl(request.query.url)
    const body = await fetchText(url)
    const result = await parseFeed(body)
    const response = constructFeedResponse(result)
    await reply.send(response)
  })

  app.get('/image', async (request: UrlRequest, reply) => {
    void reply.type('image/webp')
    void reply.header('Cache-Control', `public, max-age=${IMG_MAX_AGE}`)
    const url = parseUrl(request.query.url)
    const body = await fetchText(url)
    const imageUrl = parseUrl(await scrapeUrlImage(body, url))
    return reply.send(downloadImageAndResizeStream(imageUrl))
  })

  app.get('/logo', async (request: UrlRequest, reply) => {
    void reply.type('image/webp')
    void reply.header('Cache-Control', `public, max-age=${IMG_MAX_AGE}`)

    const url = parseUrl(request.query.url)
    const body = await fetchText(url)
    const logoUrl = parseUrl(await scrapeUrlLogo(body, url))

    if (String(logoUrl).endsWith('.ico')) {
      return reply.send(await downloadImageAndResizeIco(logoUrl))
    }

    return reply.send(downloadImageAndResizeStream(logoUrl, 32, 32))
  })

  return Promise.resolve()
}

export default feedPlugin
