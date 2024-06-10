import type { FastifyPluginAsync } from 'fastify'

import { versionInfoSchema } from '@newsdash/schema'

import { PKG_NAME, PKG_VERSION } from '#constants'

import feedPlugin from './feed/feed.js'
import statePlugin from './state.js'

const apiPlugin: FastifyPluginAsync = async (app) => {
  await app.register(feedPlugin, { prefix: '/feed' })
  await app.register(statePlugin, { prefix: '/state' })

  app.get('/version', () => {
    return versionInfoSchema.parse({ name: PKG_NAME, version: PKG_VERSION })
  })

  app.setErrorHandler(async (error, request, reply) => {
    request.log.warn(error)
    const statusCode = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500

    const response =
      process.env.NODE_ENV === 'production'
        ? { result: statusCode >= 500 ? 'Internal server error' : error.message }
        : { result: error.message }

    await reply.code(statusCode).type('application/json').send(response)
  })

  app.setNotFoundHandler(async (request, reply) => {
    await reply.code(404).type('application/json').send({ result: 'not found' })
  })
}

export default apiPlugin
