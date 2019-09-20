import express from 'express'

import { CLIENT_DIST_DIR, DEFAULT_PORT } from './constants'
import apiRouter from './api'
import errorHandlers from './errorHandlers'

express()
  .use(express.json())
  .use('/api', apiRouter)
  .use(express.static(CLIENT_DIST_DIR))
  .use((req, res, next) => {
    const err = new Error()
    err.statusCode = 404
    next(err)
  })
  .use(errorHandlers)
  .listen(DEFAULT_PORT, () => console.log(`Listening on port ${DEFAULT_PORT}`))
