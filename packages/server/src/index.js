import express from 'express'

import { CLIENT_DIST_DIR, DEFAULT_PORT } from './constants.js'
import apiRouter from './api/index.js'
import errorHandlers from './errorHandlers.js'

express()
  .use(express.json())
  .use('/api', apiRouter)
  .use(express.static(CLIENT_DIST_DIR))
  .use(errorHandlers)
  .listen(DEFAULT_PORT, () => console.log(`Listening on port ${DEFAULT_PORT}`))
