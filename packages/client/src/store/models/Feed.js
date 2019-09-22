import { Model, attr, fk } from 'redux-orm'

import { FEED_STATUS, FEED_DISPLAY } from 'newsdash/constants'
import { actionTypes as appActionTypes } from 'newsdash/store/actions/app'
import { actionTypes as feedActionTypes } from 'newsdash/store/actions/feed'

export default class Feed extends Model {
  static get modelName() {
    return 'Feed'
  }

  static get fields() {
    return {
      id: attr(),
      url: attr({ getDefault: () => '' }),
      customTitle: attr(),
      link: attr({ getDefault: () => '' }),
      title: attr({ getDefault: () => 'New feed' }),
      status: attr({ getDefault: () => FEED_STATUS.NEW }),
      display: attr({ getDefault: () => FEED_DISPLAY.DETAILED }),
      error: attr(),
      index: attr(),
      lastFetched: attr({ getDefault: () => 0 }),
      feedBox: fk('FeedBox', 'feeds'),
    }
  }

  static reducer(action, feedModel, session) {
    switch (action.type) {
      case feedActionTypes.ADD_FEED: {
        // find highest index
        const feeds = session
          .FeedBox
          .withId(action.feedBoxId)
          .feeds
          .toRefArray()
        const index = feeds.length
          ? feeds
            .map((feed) => feed.index)
            .sort((a, b) => b - a)[0] + 1
          : 0
        feedModel.create({
          feedBox: action.feedBoxId,
          index,
          url: action.url,
        })
        break
      }

      case feedActionTypes.DELETE_FEED: {
        const feed = feedModel.withId(action.id)
        feed.items.toModelArray().map((item) => item.delete())
        feed.delete()
        break
      }

      case feedActionTypes.EDIT_FEED: {
        const feed = feedModel.withId(action.id)
        if (Object.keys(action.attrs).includes('url')) {
          feed.items.toModelArray().map((item) => item.delete())
        }
        feed.update(action.attrs)
        break
      }

      case feedActionTypes.LOAD_FEED:
        feedModel.withId(action.id).update({
          status: FEED_STATUS.LOADING,
          error: undefined,
        })
        break

      case feedActionTypes.LOAD_FEED_FAILURE:
        feedModel.withId(action.id).update({
          status: FEED_STATUS.ERROR,
          error: action.error,
          lastFetched: undefined,
        })
        break

      case feedActionTypes.LOAD_FEED_SUCCESS:
        feedModel
          .withId(action.id)
          .update({
            title: action.data.title,
            link: action.data.link,
            status: FEED_STATUS.LOADED,
            error: undefined,
            lastFetched: Date.now(),
          })
        break

      case appActionTypes.RESTORE_SETTINGS:
        if (action.data.feeds) {
          action.data.feeds.forEach(
            (feed) => feedModel.upsert(feed)
          )
        }
        break

      default:
        break
    }
  }
}
