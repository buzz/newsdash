import { Model, attr } from 'redux-orm'

import {
  DEFAULT_CORS_PROXY,
  DEFAULT_FAVICON_PROXY,
  DEFAULT_FETCH_INTERVAL,
  DEFAULT_GRID_COLS,
  MAX_FEED_ITEMS_TO_KEEP,
} from '../../constants'
import { actionTypes as appActionTypes } from '../actions/app'

export default class App extends Model {
  static get modelName() {
    return 'App'
  }

  static get fields() {
    return {
      id: attr({ getDefault: () => 0 }),
      gridCols: attr({ getDefault: () => DEFAULT_GRID_COLS }),
      corsProxy: attr({ getDefault: () => DEFAULT_CORS_PROXY }),
      faviconProxy: attr({ getDefault: () => DEFAULT_FAVICON_PROXY }),
      feedItemsToKeep: attr({ getDefault: () => MAX_FEED_ITEMS_TO_KEEP }),
      fetchInterval: attr({ getDefault: () => DEFAULT_FETCH_INTERVAL }),
    }
  }

  static reducer(action, appModel) {
    switch (action.type) {
      case appActionTypes.UPDATE_SETTINGS:
        appModel.first().update(action.settings)
        break
      default:
    }
  }
}
