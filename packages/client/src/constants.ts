import type { Display } from '@newsdash/common/schema'

import type { DisplayParams } from '#types/types'

const DEFAULT_BLUR = 2

const FETCH_TIMEOUT = 5000

const TAB_MIN_WIDTH = 300
const TAB_MIN_HEIGHT = 300

const DOCKBOX_ID = '__dockbox__'

const LOCALSTORAGE_FEEDITEMS_KEY = 'newsdash_feeditems'
const LOCALSTORAGE_SETTINGS_KEY = 'newsdash_settings'

const LIGHTNESS_MIN = -20
const LIGHTNESS_MAX = 20
const SATURATION_MIN = 0
const SATURATION_MAX = 100
const FETCH_INTERVAL_MIN = 5
const FETCH_INTERVAL_MAX = 60
const ITEMS_TO_KEEP_MIN = 10
const ITEMS_TO_KEEP_MAX = 1000
const MIN_COLUMN_WIDTH_DEFAULT = 300
const MIN_COLUMN_WIDTH_MIN = 100
const MIN_COLUMN_WIDTH_MAX = 1000

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
  DEFAULT_BLUR,
  DISPLAY_PARAMS,
  DOCKBOX_ID,
  FETCH_INTERVAL_MAX,
  FETCH_INTERVAL_MIN,
  FETCH_TIMEOUT,
  ITEMS_TO_KEEP_MAX,
  ITEMS_TO_KEEP_MIN,
  LIGHTNESS_MAX,
  LIGHTNESS_MIN,
  LOCALSTORAGE_FEEDITEMS_KEY,
  LOCALSTORAGE_SETTINGS_KEY,
  MIN_COLUMN_WIDTH_DEFAULT,
  MIN_COLUMN_WIDTH_MAX,
  MIN_COLUMN_WIDTH_MIN,
  SATURATION_MAX,
  SATURATION_MIN,
  TAB_MIN_HEIGHT,
  TAB_MIN_WIDTH,
}
