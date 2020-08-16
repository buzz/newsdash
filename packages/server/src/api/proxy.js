import stream from 'stream'
import { promisify } from 'util'
import express from 'express'
import metascraper from 'metascraper'
import metascraperImage from 'metascraper-image'
import got from 'got'
import QuickLRU from 'quick-lru'

import { FETCH_TIMEOUT, USER_AGENT } from '../constants'

const pipeline = promisify(stream.pipeline)
const cache = new QuickLRU({ maxSize: 1000 })

const fetchFile = (url, opts = {}) =>
  got(url, {
    cache,
    decompress: false,
    headers: { 'User-Agent': USER_AGENT },
    method: 'GET',
    timeout: FETCH_TIMEOUT,
    ...opts,
  })

const imageScraper = metascraper([metascraperImage()])

export default express
  .Router()
  .post('/feed', async (req, res, next) => {
    const { url } = req.body
    if (url) {
      try {
        await pipeline(fetchFile(url, { isStream: true }), res)
      } catch (err) {
        next(err)
      }
    } else {
      res.status(400).end()
    }
  })
  .post('/meta-image', async (req, res, next) => {
    const { url } = req.body
    try {
      const { body: html } = await fetchFile(url)
      let { image } = await imageScraper({ html, url })
      if (image) {
        // metascraper might return list of images
        image = image.match(',') ? image.split(',')[0] : image
        res.json({ image })
      } else {
        res.status(400).end()
      }
    } catch (err) {
      next(err)
    }
  })
