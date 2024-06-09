import cors from 'cors'
import express from 'express'

import apiRouter from './api/apiRouter.js'
import { DEFAULT_PORT } from './constants.js'
import errorHandlers from './errorHandlers.js'

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: '*' }))
}

app
  .use(express.json())
  .use('/api', apiRouter)
  .use(errorHandlers)
  .listen(DEFAULT_PORT, () => {
    console.log(`Listening on port ${DEFAULT_PORT}`)
  })
