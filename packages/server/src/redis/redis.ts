import Redis from 'ioredis'

import { DEFAULT_REDIS_URL } from '#constants'

import { getHmFields, objToHmData, translateRedisHash } from './dataConversion'

const redis = new Redis(process.env.REDIS_URL || DEFAULT_REDIS_URL, {
  showFriendlyErrorStack: process.env.NODE_ENV !== 'production',
})

const scan = (pattern) =>
  new Promise((resolve) => {
    const stream = redis.scanStream({ match: pattern })
    let keys = []
    stream.on('data', (foundKeys) => {
      keys = [...keys, ...foundKeys]
    })
    stream.on('end', () => resolve(keys))
  })

export const getAllHashes = async (pattern, fields) => {
  const hmFields = getHmFields(fields)
  const keys = await scan(pattern)
  const pipeline = redis.pipeline()
  for (let i = 0; i < keys.length; i += 1) {
    pipeline.hmget(keys[i], hmFields)
  }
  return pipeline.exec().then((results) =>
    results.reduce((acc, result) => {
      acc.push(translateRedisHash(result[1], fields))
      return acc
    }, [])
  )
}

export const getHash = async (key, fields) => {
  const exists = await redis.exists(key)
  if (exists === 1) {
    const hmFields = getHmFields(fields)
    const data = await redis.hmget(key, hmFields)
    return translateRedisHash(data, fields)
  }
  return null
}

export const setHash = (key, obj, fields) => {
  const hmFields = getHmFields(fields)
  const hmData = objToHmData(obj, hmFields)
  return redis.hmset(key, hmData)
}

export const updateHashesDeleteOthers = async (pattern, objs, fields) => {
  let i
  const hmFields = getHmFields(fields)
  const keysToDelete = await scan(pattern)
  const keyBase = pattern.slice(0, -1)
  const pipeline = redis.pipeline()
  for (i = 0; i < objs.length; i += 1) {
    const obj = objs[i]
    const key = `${keyBase}${obj.id}`
    const idx = keysToDelete.indexOf(key)
    if (idx > -1) {
      keysToDelete.splice(idx, 1)
    }
    // update hash
    pipeline.hmset(key, objToHmData(obj, hmFields))
  }
  // delete all that are not in update set
  for (i = 0; i < keysToDelete.length; i += 1) {
    pipeline.del(keysToDelete[i])
  }
  return pipeline.exec()
}

export default redis
