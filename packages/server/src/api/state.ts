import fastifyRedis from '@fastify/redis'
import type { FastifyPluginAsync } from 'fastify'

import { layout, persistLayoutSchema } from '@newsdash/common/schema'

import { DEFAULT_REDIS_URL } from '#constants'
import { getAllHashes, updateHashesDeleteOthers } from '#redis'

import { BadRequest, NotFound } from './errors.js'

const APP_PREFIX = 'newsdash'
const BOXES_KEY = `${APP_PREFIX}:boxes:*`
const PANELS_KEY = `${APP_PREFIX}:panels:*`
const TABS_KEY = `${APP_PREFIX}:tabs:*`

const redisUrl = process.env.REDIS_URL ?? DEFAULT_REDIS_URL

const statePlugin: FastifyPluginAsync = async (app) => {
  try {
    await app.register(fastifyRedis, {
      closeClient: true,
      url: redisUrl,
      showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
    })
  } catch {
    app.log.error('Could not connect to Redis.')
  }

  app.get('/layout', async () => {
    const result = persistLayoutSchema.safeParse({
      boxes: await getAllHashes(app.redis, BOXES_KEY, layout.boxSchema),
      panels: await getAllHashes(app.redis, PANELS_KEY, layout.panelSchema),
      tabs: await getAllHashes(app.redis, TABS_KEY, layout.storeTabSchema),
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
    await updateHashesDeleteOthers(app.redis, TABS_KEY, tabs, layout.storeTabSchema)
    await reply.send({ result: 'ok ' })
  })
}

export default statePlugin
