import express from 'express'

import { versionInfoSchema } from '@newsdash/schema'

import { PKG_NAME, PKG_VERSION } from '#constants'

import proxyRouter from './proxyRouter.js'
import userRouter from './userRouter.js'

const apiRouter = express
  .Router()
  .get('/version', (req, res) => {
    res.json(versionInfoSchema.parse({ name: PKG_NAME, version: PKG_VERSION }))
  })
  .use('/proxy', proxyRouter)
  .use('/user', userRouter)

export default apiRouter
