import express from 'express'
import metascraper from 'metascraper'
import metascraperImage from 'metascraper-image'
import got from 'got'
import QuickLRU from 'quick-lru'

import pkg from '../../../package.json'

const USER_AGENT = `${pkg.name}/${pkg.version} (https://github.com/buzz/newsdash)`

const imageScraper = metascraper([metascraperImage()])

const app = express()
const port = 3001

const feedContentTypes = [
  'text/xml',
  'application/xml',
  'application/rdf+xml',
  'application/rss+xml',
  'application/atom+xml',
]
const htmlContentType = 'text/html'

const cache = new QuickLRU({ maxSize: 1000 })

const fetch = async (url, acceptedContentTypes = null) => {
  const response = await got(
    url,
    {
      cache,
      headers: { 'user-agent': USER_AGENT },
    }
  )
  const contentType = response.headers['content-type']
  if (acceptedContentTypes) {
    const correctContentType = acceptedContentTypes.some(
      (testContentType) => contentType.startsWith(testContentType)
    )
    if (!correctContentType) {
      throw new Error(`Wrong content-type received: ${contentType}`)
    }
  }
  return response
}

app.get('/api/version', (req, res) => {
  res.json({ name: pkg.name, version: pkg.version })
})

app.get('/api/fetch-feed/:requestedUrl', async (req, res, next) => {
  const { requestedUrl } = req.params
  try {
    const { body, headers } = await fetch(requestedUrl, feedContentTypes)
    res.set('Content-Type', headers['content-type'])
    res.send(body)
  } catch (err) {
    next(err)
  }
})

app.get('/api/image/:requestedUrl', async (req, res, next) => {
  const { requestedUrl } = req.params
  try {
    const { body: html, url } = await fetch(requestedUrl, [htmlContentType])
    const metadata = await imageScraper({ html, url })
    if (metadata.image) {
      res.json(
        // metascraper might return list of images
        metadata.image.match(',')
          ? { image: metadata.image.split(',')[0] }
          : metadata
      )
    } else {
      throw new Error('No image returned from metascraper!')
    }
  } catch (err) {
    next(err)
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`))
