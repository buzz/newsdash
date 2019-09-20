import express from 'express'

import { FIELDS_APP, FIELDS_FEEDBOX, FIELDS_FEED } from '../constants'
import {
  getAllHashes,
  getHash,
  setHash,
  updateHashesDeleteOthers,
} from '../redis'

export default express.Router()
  .get('/state', async (req, res) => {
    res.json({
      app: await getHash('newsdash:app', FIELDS_APP),
      feedBoxes: await getAllHashes('newsdash:feedBox:*', FIELDS_FEEDBOX),
      feeds: await getAllHashes('newsdash:feed:*', FIELDS_FEED),
    })
  })
  .post('/state', async (req, res) => {
    const { app, feedBoxes = [], feeds = [] } = req.body
    if (app) {
      await setHash('newsdash:app', app, FIELDS_APP)
    }
    await updateHashesDeleteOthers('newsdash:feedBox:*', feedBoxes, FIELDS_FEEDBOX)
    await updateHashesDeleteOthers('newsdash:feed:*', feeds, FIELDS_FEED)
    res.json({ result: 'ok' })
  })
