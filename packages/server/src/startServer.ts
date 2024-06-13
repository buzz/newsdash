import Fastify from 'fastify'

import { DEFAULT_PORT } from '#constants'

import apiPlugin from './api/api.js'

const logger =
  process.env.NODE_ENV === 'production'
    ? {
        level: 'warn',
      }
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      }

const fastify = Fastify({ logger })

await fastify.register(apiPlugin, { prefix: '/api' })

fastify.listen({ port: DEFAULT_PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
  } else {
    fastify.log.info(`Server listening on ${address}`)
  }
})
