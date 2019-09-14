import { Model, attr } from 'redux-orm'

import { actionTypes as feedBoxActionTypes } from 'newsdash/store/actions/feedBox'

export default class FeedBox extends Model {
  static get modelName() {
    return 'FeedBox'
  }

  static get fields() {
    return {
      id: attr(),
      hue: attr({ getDefault: () => Math.round(Math.random() * 360) }),
      title: attr(),
      x: attr({ getDefault: () => 0 }),
      y: attr({ getDefault: () => 0 }),
      w: attr({ getDefault: () => 1 }),
      h: attr({ getDefault: () => 8 }),
    }
  }

  static reducer(action, feedBoxModel) {
    switch (action.type) {
      case feedBoxActionTypes.ADD_FEED_BOX:
        feedBoxModel.create({})
        break
      case feedBoxActionTypes.DELETE_FEED_BOX: {
        const feedBox = feedBoxModel.withId(action.id)
        feedBox.feeds.toModelArray().forEach((feed) => {
          feed.items.toModelArray().forEach((item) => item.delete())
          feed.delete()
        })
        feedBox.delete()
        break
      }
      case feedBoxActionTypes.EDIT_FEED_BOX:
        feedBoxModel.withId(action.id).update(action.attrs)
        break
      default:
        break
    }
  }
}
