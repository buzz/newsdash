import type { FastifyRedis } from '@fastify/redis'
import type { z } from 'zod'

import { getSchemaFields, objToHmData, parseRedisHash } from './dataConversion.js'

function assertRedisHashResult(thing: unknown): asserts thing is RedisHashResult {
  if (
    !Array.isArray(thing) ||
    thing.some((element) => element !== null && typeof element !== 'string')
  ) {
    throw new Error('Expected array of strings/nulls')
  }
}

function scan(redis: FastifyRedis, pattern: string): Promise<Set<string>> {
  return new Promise((resolve) => {
    const stream = redis.scanStream({ match: pattern })
    const keys = new Set<string>()
    stream.on('data', (foundKeys) => {
      if (Array.isArray(foundKeys)) {
        for (const key of foundKeys) {
          if (typeof key === 'string') {
            keys.add(key)
          }
        }
      }
    })
    stream.on('end', () => {
      resolve(keys)
    })
  })
}

async function getAllHashes<T extends z.SomeZodObject>(
  redis: FastifyRedis,
  pattern: string,
  schema: T
): Promise<z.infer<T>[]> {
  const hmFields = getSchemaFields(schema)
  const keys = await scan(redis, pattern)

  const pipeline = redis.pipeline()
  for (const key of keys) {
    pipeline.hmget(key, ...hmFields)
  }

  const results = await pipeline.exec()

  if (!results) {
    throw new Error('No results received')
  }

  const hashes: z.infer<T>[] = []

  for (const [error, data] of results) {
    if (error) {
      throw error
    }

    assertRedisHashResult(data)
    hashes.push(parseRedisHash(data, schema))
  }

  return hashes
}

async function updateHashesDeleteOthers(
  redis: FastifyRedis,
  pattern: string,
  objs: Record<string, RedisHashElementType>[],
  schema: z.SomeZodObject
) {
  const hmFields = getSchemaFields(schema)
  const deleteSet = await scan(redis, pattern)

  const keyBase = pattern.slice(0, -1) // remove trailing `*`
  const pipeline = redis.pipeline()

  for (const obj of objs) {
    const key = `${keyBase}${obj.id}`

    // remove from delete set
    deleteSet.delete(key)

    // update hash
    pipeline.hmset(key, objToHmData(obj, hmFields))
  }

  // delete all that are not in update set
  for (const key of deleteSet) {
    pipeline.del(key)
  }

  return pipeline.exec()
}

type RedisHashElementType = boolean | string | number | null
type RedisHashResult = (string | null)[]

export type { RedisHashElementType, RedisHashResult }
export { getAllHashes, updateHashesDeleteOthers }
