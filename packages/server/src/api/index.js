import express from 'express'

import { PKG_NAME, PKG_VERSION } from '../constants'
import proxyRouter from './proxy'
import userRouter from './user'

export default express
  .Router()
  .get('/version', (req, res) => {
    res.json({ name: PKG_NAME, version: PKG_VERSION })
  })
  .use('/proxy', proxyRouter)
  .use('/user', userRouter)
