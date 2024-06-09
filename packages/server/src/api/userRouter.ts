import express from 'express'

import { layout, persistLayoutSchema, persistStateSchema, settingsSchema } from '@newsdash/schema'
import type { Result } from '@newsdash/schema'

import { getAllHashes, getHash, setHash, updateHashesDeleteOthers } from '#redis'

import asyncWrapper from './asyncWrapper.js'

const APP_PREFIX = 'newsdash'
const SETTINGS_KEY = `${APP_PREFIX}:settings`
const BOXES_KEY = `${APP_PREFIX}:boxes:*`
const PANELS_KEY = `${APP_PREFIX}:panels:*`
const TABS_KEY = `${APP_PREFIX}:tabs:*`

const userRouter = express
  .Router()
  .get(
    '/state',
    asyncWrapper(async (req, res) => {
      const result = persistStateSchema.safeParse({
        settings: await getHash(SETTINGS_KEY, settingsSchema),
        boxes: await getAllHashes(BOXES_KEY, layout.boxSchema),
        panels: await getAllHashes(PANELS_KEY, layout.panelSchema),
        tabs: await getAllHashes(TABS_KEY, layout.tabSchema),
      })
      if (result.success) {
        res.json(result.data)
      } else {
        console.error(result.error.message)
        res.status(404).send({})
      }
    })
  )

  .post(
    '/state/settings',
    asyncWrapper(async (req, res) => {
      const ret: Result = { result: 'ok' }

      const parsed = settingsSchema.safeParse(req.body)
      if (parsed.success) {
        await setHash(SETTINGS_KEY, parsed.data, settingsSchema)
      } else {
        ret.result = 'malformed body'
        res.status(400)
      }

      res.json(ret)
    })
  )

  .post(
    '/state/layout',
    asyncWrapper(async (req, res) => {
      const ret: Result = { result: 'ok' }

      const parsed = persistLayoutSchema.safeParse(req.body)
      if (parsed.success) {
        const { boxes, panels, tabs } = parsed.data
        await updateHashesDeleteOthers(BOXES_KEY, boxes, layout.boxSchema)
        await updateHashesDeleteOthers(PANELS_KEY, panels, layout.panelSchema)
        await updateHashesDeleteOthers(TABS_KEY, tabs, layout.tabSchema)
      } else {
        console.error(parsed.error.message)
        ret.result = 'malformed body'
        res.status(400)
      }

      res.json(ret)
    })
  )

export default userRouter
