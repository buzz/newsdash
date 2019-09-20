import express from 'express'
import metascraper from 'metascraper'
import metascraperImage from 'metascraper-image'
import got from 'got'
import QuickLRU from 'quick-lru'

import {
  FETCH_TIMEOUT,
  PKG_NAME,
  PKG_VERSION,
  USER_AGENT,
} from './constants'

const apiRouter = express.Router()
const imageScraper = metascraper([metascraperImage()])
const cache = new QuickLRU({ maxSize: 1000 })

const fetch = (url, opts = {}) => got(
  url,
  {
    cache,
    decompress: false,
    headers: { 'User-Agent': USER_AGENT },
    timeout: FETCH_TIMEOUT,
    ...opts,
  }
)

apiRouter.get('/version', (req, res) => {
  res.json({ name: PKG_NAME, version: PKG_VERSION })
})

apiRouter.get('/fetch-feed/:requestedUrl', (req, res, next) => {
  const { requestedUrl } = req.params
  fetch(requestedUrl, { stream: true })
    .on('error', next)
    .pipe(res)
})

apiRouter.get('/image/:requestedUrl', async (req, res, next) => {
  const { requestedUrl } = req.params
  try {
    const { body: html, url } = await fetch(requestedUrl)
    const metadata = await imageScraper({ html, url })
    if (metadata.image) {
      res.json(
        // metascraper might return list of images
        metadata.image.match(',')
          ? { image: metadata.image.split(',')[0] }
          : metadata
      )
    } else {
      const err = new Error('No image found')
      err.statusCode = 404
      throw err
    }
  } catch (err) {
    next(err)
  }
})

export default apiRouter
