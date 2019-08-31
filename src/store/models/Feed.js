import { Model, attr } from 'redux-orm'

import { actionTypes as feedActionTypes } from '../actions/feed'

export default class Feed extends Model {
  static get modelName() {
    return 'Feed'
  }

  static get fields() {
    return {
      id: attr({ getDefault: () => 0 }),
    }
  }

  static reducer(action, feedModel) {
    switch (action.type) {
      case feedActionTypes.LOAD_FEED_SUCCESS:
        feedModel.upsert({
          id: action.data.id,
        })
        break
      default:
        break
    }
  }
}
