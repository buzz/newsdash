import Fastify from 'fastify'

import { DEFAULT_HOST, DEFAULT_PORT } from '#constants'

import apiPlugin from './api/api.js'

const host = process.env.NEWSDASH_HOST ?? DEFAULT_HOST
const port = process.env.NEWSDASH_PORT ? Number.parseInt(process.env.NEWSDASH_PORT) : DEFAULT_PORT

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

fastify.listen({ host, port }, function (err, address) {
  if (err) {
    fastify.log.error(err)
  } else {
    fastify.log.info(`Server listening on ${address}`)
  }
})
