import express from 'express'

import { PKG_NAME, PKG_VERSION } from '../constants.js'
import proxyRouter from './proxy.js'
import userRouter from './user.js'

export default express
  .Router()
  .get('/version', (req, res) => {
    res.json({ name: PKG_NAME, version: PKG_VERSION })
  })
  .use('/proxy', proxyRouter)
  .use('/user', userRouter)
