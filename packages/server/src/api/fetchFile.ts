import KeyvRedis from '@keyv/redis'
import got from 'got'
import Keyv from 'keyv'

import { FETCH_TIMEOUT, USER_AGENT } from '#constants'
import { redis } from '#redis'

// HTTP client cache
const keyvRedis = new KeyvRedis(redis)
const storageAdapter = new Keyv({ store: keyvRedis })

const defaultOpts = {
  cache: storageAdapter,
  decompress: false,
  headers: { 'User-Agent': USER_AGENT },
  method: 'GET',
  timeout: FETCH_TIMEOUT,
}

export function fetchFile(url: string) {
  return got(url, defaultOpts)
}

export function fetchFileStream(url: string) {
  return got.stream(url, defaultOpts)
}
