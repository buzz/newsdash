export const DEFAULT_CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

export const DEFAULT_FETCH_INTERVAL = 10 * 60 * 1000
export const PRUNE_INTERVAL = 5 * 60 * 1000
export const FETCH_CHECK_INTERVAL = 30 * 1000
export const MAX_FEED_ITEMS_TO_KEEP = 100

export const NOTIFICATION_DURATION = 10000
export const DEFAULT_GRID_COLS = 4
export const MAX_CONTENT_LENGTH = 600
export const DEFAULT_LIGHTNESS = 90
export const DEFAULT_SATURATION = 40

export const SAVE_STATE_THROTTLE_DELAY = 2000
export const LOCALSTORAGE_SETTINGS_KEY = 'newsdash_settings'
export const LOCALSTORAGE_FEEDITEMS_KEY = 'newsdash_feeditems'

export const FEED_STATUS = {
  NEW: 'NEW',
  LOADED: 'LOADED',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
}

export const FEED_DISPLAY = {
  CONDENSED_LIST: 'CONDENSED_LIST',
  LIST: 'LIST',
  DETAILED: 'DETAILED',
  TILES: 'TILES',
}

export const FEED_DISPLAY_LABELS = {
  CONDENSED_LIST: 'List (condensed)',
  LIST: 'List',
  DETAILED: 'Detailed',
  TILES: 'Tiles',
}

export const NOTIFICATION_TYPES = {
  ERROR: 'ERROR',
  NORMAL: 'NORMAL',
}
