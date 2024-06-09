import stream from 'node:stream'
import { promisify } from 'node:util'

import express, { type Request } from 'express'
import { body } from 'express-validator'
import metascraper from 'metascraper'
import metascraperImage from 'metascraper-image'

import asyncWrapper from './asyncWrapper.js'
import { fetchFile, fetchFileStream } from './fetchFile.js'

const pipeline = promisify(stream.pipeline)

const imageScraper = metascraper([metascraperImage()])

function validateUrl() {
  return body('url').isURL({ protocols: ['http', 'https'] })
}

type UrlBodyRequest = Request<object, object, { url: string }>

const proxyRouter = express
  .Router()

  .post(
    '/feed',
    validateUrl(),
    body('url').isNumeric(),
    asyncWrapper((req: UrlBodyRequest, res) => pipeline(fetchFileStream(req.body.url), res))
  )

  .post(
    '/meta-image',
    validateUrl(),
    asyncWrapper(async (req: UrlBodyRequest, res) => {
      const { url } = req.body
      const { body: html } = await fetchFile(url)
      let { image } = await imageScraper({ html, url })
      if (image) {
        // metascraper might return list of images
        image = image.match(',') ? image.split(',')[0] : image
        res.json({ image })
      } else {
        res.status(400).end()
      }
    })
  )

export default proxyRouter
