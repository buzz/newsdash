import path from 'path'

import pkg from '../../../package.json'

export const PKG_NAME = pkg.name
export const PKG_VERSION = pkg.version
export const PKG_HOMEPAGE = pkg.homepage

export const CLIENT_DIST_DIR = path.resolve(__dirname, '..', '..', 'client', 'dist')
export const DEFAULT_PORT = 3001
export const DEFAULT_REDIS_URL = 'redis://127.0.0.1:6379'
export const FETCH_TIMEOUT = 10000
export const USER_AGENT = `${PKG_NAME}/${PKG_VERSION} (${PKG_HOMEPAGE})`

export const FIELDS_APP = [
  ['feedItemsToKeep', 'int'],
  ['fetchInterval', 'int'],
  ['gridCols', 'int'],
  ['lightness', 'int'],
  ['saturation', 'int'],
]
export const FIELDS_FEEDBOX = [
  ['id', 'int'],
  ['hue', 'int'],
  'title',
  ['x', 'int'],
  ['y', 'int'],
  ['w', 'int'],
  ['h', 'int'],
]
export const FIELDS_FEED = [
  ['id', 'int'],
  'url',
  'customTitle',
  'link',
  'title',
  'display',
  'filter',
  ['index', 'int'],
  ['feedBox', 'int'],
]
