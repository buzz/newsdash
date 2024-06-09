import { Redis } from 'ioredis'
import type { z } from 'zod'

import { DEFAULT_REDIS_URL } from '#constants'

import { getSchemaFields, objToHmData, parseRedisHash } from './dataConversion.js'

const redis = new Redis(process.env.REDIS_URL ?? DEFAULT_REDIS_URL, {
  showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
})

function assertRedisHashResult(thing: unknown): asserts thing is RedisHashResult {
  if (
    !Array.isArray(thing) ||
    thing.some((element) => element !== null && typeof element !== 'string')
  ) {
    throw new Error('Expected array of strings/nulls')
  }
}

function scan(pattern: string): Promise<string[]> {
  return new Promise((resolve) => {
    const stream = redis.scanStream({ match: pattern })
    const keys: string[] = []
    stream.on('data', (foundKeys) => {
      if (Array.isArray(foundKeys)) {
        for (const key of foundKeys) {
          if (typeof key === 'string') {
            keys.push(key)
          }
        }
      }
    })
    stream.on('end', () => {
      resolve(keys)
    })
  })
}

async function getHash<T extends z.SomeZodObject>(
  key: string,
  schema: T
): Promise<z.infer<T> | undefined> {
  const exists = await redis.exists(key)
  if (exists === 1) {
    const hmFields = getSchemaFields(schema)
    const data = await redis.hmget(key, ...hmFields)
    assertRedisHashResult(data)
    return parseRedisHash(data, schema)
  }
  return undefined
}

async function getAllHashes<T extends z.SomeZodObject>(
  pattern: string,
  schema: T
): Promise<z.infer<T>[]> {
  const hmFields = getSchemaFields(schema)
  const keys = await scan(pattern)

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

function setHash(key: string, obj: Record<string, string | number>, schema: z.SomeZodObject) {
  const hmFields = getSchemaFields(schema)
  const hmData = objToHmData(obj, hmFields)
  return redis.hmset(key, hmData)
}

async function updateHashesDeleteOthers(
  pattern: string,
  objs: Record<string, string | number | null>[],
  schema: z.SomeZodObject
) {
  const hmFields = getSchemaFields(schema)
  const deleteSet = await scan(pattern)

  const keyBase = pattern.slice(0, -1) // remove trailing `*`
  const pipeline = redis.pipeline()

  for (const obj of objs) {
    const key = `${keyBase}${obj.id}`

    // remove from delete set
    const idx = deleteSet.indexOf(key)
    if (idx > -1) {
      deleteSet.splice(idx, 1)
    }

    // update hash
    pipeline.hmset(key, objToHmData(obj, hmFields))
  }

  // delete all that are not in update set
  for (const key of deleteSet) {
    pipeline.del(key)
  }

  return pipeline.exec()
}

type RedisHashResult = (string | null)[]

export type { RedisHashResult }
export { getAllHashes, getHash, redis, setHash, updateHashesDeleteOthers }
