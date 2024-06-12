import pkgData from '../../../package.json' with { type: 'json' }

const PKG_NAME = pkgData.name
const PKG_VERSION = pkgData.version
const PKG_HOMEPAGE = pkgData.homepage

const DEFAULT_PORT = 3001
const DEFAULT_REDIS_URL = 'redis://127.0.0.1:6379'
const FETCH_TIMEOUT = 10_000
const USER_AGENT = `${PKG_NAME}/${PKG_VERSION} (${PKG_HOMEPAGE})`

const MAX_CONTENT_LENGTH = 400
const IMG_WIDTH = 300
const IMG_HEIGHT = 200
const IMG_QUALITY = 90
const IMG_MAX_AGE = 5_184_000 // 60d

export {
  DEFAULT_PORT,
  DEFAULT_REDIS_URL,
  FETCH_TIMEOUT,
  IMG_HEIGHT,
  IMG_MAX_AGE,
  IMG_QUALITY,
  IMG_WIDTH,
  MAX_CONTENT_LENGTH,
  PKG_HOMEPAGE,
  PKG_NAME,
  PKG_VERSION,
  USER_AGENT,
}
