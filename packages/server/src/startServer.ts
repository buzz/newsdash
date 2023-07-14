import express from 'express'

import apiRouter from './api/apiRouter'
import { DEFAULT_PORT } from './constants'
import errorHandlers from './errorHandlers'

express()
  .use(express.json())
  .use('/api', apiRouter)
  .use(errorHandlers)
  .listen(DEFAULT_PORT, () => console.log(`Listening on port ${DEFAULT_PORT}`))
