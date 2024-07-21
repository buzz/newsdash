import pkgData from '../../../package.json' with { type: 'json' }

const PKG_NAME = pkgData.name
const PKG_VERSION = pkgData.version

const DEFAULT_HOST = 'localhost'
const DEFAULT_PORT = 3000
const DEFAULT_REDIS_URL = 'redis://127.0.0.1:6379'
const FETCH_TIMEOUT = 10_000
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.3'

const MAX_CONTENT_LENGTH = 400
const IMG_QUALITY = 85
const IMG_MAX_AGE = 5_184_000 // 60d

export {
  DEFAULT_HOST,
  DEFAULT_PORT,
  DEFAULT_REDIS_URL,
  FETCH_TIMEOUT,
  IMG_MAX_AGE,
  IMG_QUALITY,
  MAX_CONTENT_LENGTH,
  PKG_NAME,
  PKG_VERSION,
  USER_AGENT,
}
