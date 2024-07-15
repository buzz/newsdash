import type { Display } from '@newsdash/common/schema'

import type { DisplayParams } from '#types/types'

const DEFAULT_BLUR = 2

const FETCH_TIMEOUT = 5000

const TAB_MIN_WIDTH = 300
const TAB_MIN_HEIGHT = 300

const DOCKBOX_ID = '__dockbox__'

const LOCALSTORAGE_FEEDITEMS_KEY = 'newsdash_feeditems'
const LOCALSTORAGE_SETTINGS_KEY = 'newsdash_settings'

const API_BASE = '/api/'

const SCROLLER_PADDING_Y = 6

const LIGHTNESS_DEFAULT = 0
const LIGHTNESS_MIN = -20
const LIGHTNESS_MAX = 20
const SATURATION_DEFAULT = 20
const SATURATION_MIN = 0
const SATURATION_MAX = 100
const FETCH_INTERVAL_DEFAULT = 10
const FETCH_INTERVAL_MIN = 5
const FETCH_INTERVAL_MAX = 60
const ITEMS_TO_KEEP_DEFAULT = 10
const ITEMS_TO_KEEP_MIN = 10
const ITEMS_TO_KEEP_MAX = 200
const MAX_COLUMN_WIDTH_DEFAULT = 300
const MAX_COLUMN_WIDTH_MIN = 100
const MAX_COLUMN_WIDTH_MAX = 1000

const DISPLAY_PARAMS: Record<Display, DisplayParams> = {
  condensedList: {
    height: 24,
    overscanCount: 8,
  },
  list: {
    height: 36,
    overscanCount: 5,
  },
  detailed: {
    height: 92,
  },
  tiles: {
    height: 201,
  },
}

export {
  API_BASE,
  DEFAULT_BLUR,
  DISPLAY_PARAMS,
  DOCKBOX_ID,
  FETCH_INTERVAL_DEFAULT,
  FETCH_INTERVAL_MAX,
  FETCH_INTERVAL_MIN,
  FETCH_TIMEOUT,
  ITEMS_TO_KEEP_DEFAULT,
  ITEMS_TO_KEEP_MAX,
  ITEMS_TO_KEEP_MIN,
  LIGHTNESS_DEFAULT,
  LIGHTNESS_MAX,
  LIGHTNESS_MIN,
  LOCALSTORAGE_FEEDITEMS_KEY,
  LOCALSTORAGE_SETTINGS_KEY,
  MAX_COLUMN_WIDTH_DEFAULT,
  MAX_COLUMN_WIDTH_MAX,
  MAX_COLUMN_WIDTH_MIN,
  SATURATION_DEFAULT,
  SATURATION_MAX,
  SATURATION_MIN,
  SCROLLER_PADDING_Y,
  TAB_MIN_HEIGHT,
  TAB_MIN_WIDTH,
}
