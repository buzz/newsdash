import fastifyRedis from '@fastify/redis'
import type { FastifyPluginAsync } from 'fastify'

import { layout, persistLayoutSchema, settingsSchema } from '@newsdash/schema'

import { DEFAULT_REDIS_URL } from '#constants'
import { getAllHashes, getHash, setHash, updateHashesDeleteOthers } from '#redis/redis.js'

const APP_PREFIX = 'newsdash'
const SETTINGS_KEY = `${APP_PREFIX}:settings`
const BOXES_KEY = `${APP_PREFIX}:boxes:*`
const PANELS_KEY = `${APP_PREFIX}:panels:*`
const TABS_KEY = `${APP_PREFIX}:tabs:*`

const redisUrl = process.env.REDIS_URL ?? DEFAULT_REDIS_URL

import { BadRequest, NotFound } from './errors.js'

const statePlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifyRedis, {
    url: redisUrl,
    showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
  })

  app.get('/settings', async (request, reply) => {
    const result = settingsSchema.safeParse(await getHash(app.redis, SETTINGS_KEY, settingsSchema))

    if (result.success) {
      return result.data
    }

    app.log.error(result.error.message)
    throw new NotFound()
  })

  app.post('/settings', async (request, reply) => {
    const parsed = settingsSchema.safeParse(request.body)

    if (!parsed.success) {
      throw new BadRequest('Malformed body')
    }

    await setHash(app.redis, SETTINGS_KEY, parsed.data, settingsSchema)
    await reply.send({ result: 'ok ' })
  })

  app.get('/layout', async (request, reply) => {
    const result = persistLayoutSchema.safeParse({
      boxes: await getAllHashes(app.redis, BOXES_KEY, layout.boxSchema),
      panels: await getAllHashes(app.redis, PANELS_KEY, layout.panelSchema),
      tabs: await getAllHashes(app.redis, TABS_KEY, layout.tabSchema),
    })

    if (result.success) {
      return result.data
    }

    app.log.error(result.error.message)
    throw new NotFound()
  })

  app.post('/layout', async (request, reply) => {
    const parsed = persistLayoutSchema.safeParse(request.body)

    if (!parsed.success) {
      throw new BadRequest('Malformed body')
    }

    const { boxes, panels, tabs } = parsed.data
    await updateHashesDeleteOthers(app.redis, BOXES_KEY, boxes, layout.boxSchema)
    await updateHashesDeleteOthers(app.redis, PANELS_KEY, panels, layout.panelSchema)
    await updateHashesDeleteOthers(app.redis, TABS_KEY, tabs, layout.tabSchema)
    await reply.send({ result: 'ok ' })
  })
}

export default statePlugin
