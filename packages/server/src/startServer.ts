import Fastify from 'fastify'

import { DEFAULT_PORT } from '#constants'

import apiPlugin from './api/api.js'

const fastify = Fastify({
  logger: process.env.NODE_ENV !== 'production',
})

await fastify.register(apiPlugin, { prefix: '/api' })

fastify.listen({ port: DEFAULT_PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
  } else {
    fastify.log.info(`Server listening on ${address}`)
  }
})
