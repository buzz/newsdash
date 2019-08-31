import { Model, attr } from 'redux-orm'
import uuidv1 from 'uuid/v1'

import { FEED_STATUS } from '../../constants'
import { actionTypes as feedActionTypes } from '../actions/feed'

export default class Feed extends Model {
  static get modelName() {
    return 'Feed'
  }

  static get fields() {
    return {
      id: attr({ getDefault: () => uuidv1() }),
      url: attr({ getDefault: () => '' }),
      link: attr({ getDefault: () => '' }),
      title: attr({ getDefault: () => 'New feed' }),
      color: attr({ getDefault: () => '' }), // TODO random color
      status: attr({ getDefault: () => FEED_STATUS.NEW }),
      error: attr(),
      lastFetched: attr(),
      x: attr({ getDefault: () => 0 }),
      y: attr({ getDefault: () => 0 }),
      w: attr({ getDefault: () => 1 }),
      h: attr({ getDefault: () => 8 }),
    }
  }

  static reducer(action, feedModel, session) {
    switch (action.type) {
      case feedActionTypes.ADD_FEED:
        feedModel.create({})
        break
      case feedActionTypes.DELETE_FEED:
        feedModel.withId(action.id).delete()
        break
      case feedActionTypes.EDIT_FEED:
        feedModel.withId(action.id).update(action.feed)
        if (action.prevFeed.url !== action.feed.url) {
          feedModel.withId(action.id).update({ lastFetched: undefined })
        }
        break
      case feedActionTypes.LOAD_FEED:
        feedModel.update({
          status: FEED_STATUS.LOADING,
          error: undefined,
        })
        break
      case feedActionTypes.LOAD_FEED_FAILURE:
        feedModel.update({
          status: FEED_STATUS.ERROR,
          error: action.error,
          lastFetched: undefined,
        })
        break
      case feedActionTypes.LOAD_FEED_SUCCESS:
        action.data.items.forEach((item) => {
          session.FeedItem.upsert({
            id: item.id || item.guid,
            link: item.link,
            date: Date.parse(item.isoDate),
            title: item.title,
            content: item.contentSnippet || item.content,
            feed: action.id,
          })
        })
        feedModel.withId(action.id).update({
          title: action.data.title,
          link: action.data.link,
          status: FEED_STATUS.LOADED,
          error: undefined,
          lastFetched: Date.now(),
        })
        break
      default:
        break
    }
  }
}
