import path from 'path'
import express from 'express'
import metascraper from 'metascraper'
import metascraperImage from 'metascraper-image'
import got from 'got'
import QuickLRU from 'quick-lru'

import pkg from '../../../package.json'

const USER_AGENT = `${pkg.name}/${pkg.version} (https://github.com/buzz/newsdash)`
const CLIENT_DIST_DIR = path.resolve(__dirname, '..', '..', 'client', 'dist')

const imageScraper = metascraper([metascraperImage()])

const app = express()
const port = 3001

const cache = new QuickLRU({ maxSize: 1000 })

const fetch = (url, opts = {}) => got(
  url,
  {
    cache,
    decompress: false,
    headers: { 'User-Agent': USER_AGENT },
    timeout: 10000,
    ...opts,
  }
)

app.get('/api/version', (req, res) => {
  res.json({ name: pkg.name, version: pkg.version })
})

app.get('/api/fetch-feed/:requestedUrl', (req, res, next) => {
  const { requestedUrl } = req.params
  fetch(requestedUrl, { stream: true })
    .on('error', next)
    .pipe(res)
})

app.get('/api/image/:requestedUrl', async (req, res, next) => {
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

app.use(express.static(CLIENT_DIST_DIR))

app.use((req, res, next) => {
  const err = new Error('Page Not Found')
  err.statusCode = 404
  next(err)
})

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack)
  }
  res
    .status(err.statusCode || 500)
    .json({ message: err.message })
  next()
})

app.listen(port, () => console.log(`Listening on port ${port}`))
