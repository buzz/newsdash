import { Model, attr } from 'redux-orm'

import {
  DEFAULT_CORS_PROXY,
  DEFAULT_FETCH_INTERVAL,
  DEFAULT_GRID_COLS,
  DEFAULT_LIGHTNESS,
  DEFAULT_SATURATION,
  MAX_FEED_ITEMS_TO_KEEP,
} from 'newsdash/constants'
import { actionTypes as appActionTypes } from 'newsdash/store/actions/app'

export default class App extends Model {
  static get modelName() {
    return 'App'
  }

  static get fields() {
    return {
      id: attr({ getDefault: () => 0 }),
      apiPresent: attr({ getDefault: () => false }),
      gridCols: attr({ getDefault: () => DEFAULT_GRID_COLS }),
      corsProxy: attr({ getDefault: () => DEFAULT_CORS_PROXY }),
      feedItemsToKeep: attr({ getDefault: () => MAX_FEED_ITEMS_TO_KEEP }),
      fetchInterval: attr({ getDefault: () => DEFAULT_FETCH_INTERVAL }),
      lightness: attr({ getDefault: () => DEFAULT_LIGHTNESS }),
      saturation: attr({ getDefault: () => DEFAULT_SATURATION }),
    }
  }

  static reducer(action, appModel, session) {
    switch (action.type) {
      case appActionTypes.EDIT_APP:
        appModel.first().update(action.attrs)
        break

      case appActionTypes.CLEAR_STATE:
        ;[appModel, session.Feed, session.FeedBox, session.FeedItem].forEach(
          (EntityModel) =>
            EntityModel.all()
              .toModelArray()
              .forEach((instance) => instance.delete())
        )
        appModel.create({})
        break

      case appActionTypes.RESTORE_APP_SETTINGS:
        if (action.data) {
          appModel.upsert({ ...action.data, id: 0 })
        }
        break

      default:
        break
    }
  }
}
