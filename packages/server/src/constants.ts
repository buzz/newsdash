import pkgData from '../../../package.json' with { type: 'json' }

export const PKG_NAME = pkgData.name
export const PKG_VERSION = pkgData.version
export const PKG_HOMEPAGE = pkgData.homepage

export const DEFAULT_PORT = 3001
export const DEFAULT_REDIS_URL = 'redis://127.0.0.1:6379'
export const FETCH_TIMEOUT = 10_000
export const USER_AGENT = `${PKG_NAME}/${PKG_VERSION} (${PKG_HOMEPAGE})`
