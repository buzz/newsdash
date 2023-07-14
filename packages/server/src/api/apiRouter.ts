import express from 'express'

import { PKG_NAME, PKG_VERSION } from '#constants'

import proxyRouter from './proxyRouter'
import userRouter from './userRouter'

const apiRouter = express
  .Router()
  .get('/version', (req, res) => {
    res.json({ name: PKG_NAME, version: PKG_VERSION })
  })
  .use('/proxy', proxyRouter)
  .use('/user', userRouter)

export default apiRouter
