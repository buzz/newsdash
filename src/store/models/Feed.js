import { Model, attr, fk } from 'redux-orm'

import { FEED_STATUS, MAX_CONTENT_LENGTH } from '../../constants'
import { actionTypes as feedActionTypes } from '../actions/feed'

const truncate = (text) => (
  text.length > MAX_CONTENT_LENGTH
    ? `${text.substring(0, MAX_CONTENT_LENGTH)}…`
    : text
)

export default class Feed extends Model {
  static get modelName() {
    return 'Feed'
  }

  static get fields() {
    return {
      id: attr(),
      url: attr({ getDefault: () => '' }),
      link: attr({ getDefault: () => '' }),
      title: attr({ getDefault: () => 'New feed' }),
      status: attr({ getDefault: () => FEED_STATUS.NEW }),
      error: attr(),
      lastFetched: attr({ getDefault: () => 0 }),
      useCorsProxy: attr({ getDefault: () => false }),
      feedBox: fk('FeedBox', 'feeds'),
    }
  }

  static reducer(action, feedModel, session) {
    switch (action.type) {
      case feedActionTypes.ADD_FEED:
        feedModel.create({ feedBox: action.feedBoxId, url: action.url })
        break
      case feedActionTypes.DELETE_FEED: {
        const feed = feedModel.withId(action.id)
        feed.items.toModelArray().map((item) => item.delete())
        feed.delete()
        break
      }
      case feedActionTypes.EDIT_FEED:
        feedModel.withId(action.id).update(action.feed)
        if (action.prevFeed.url !== action.feed.url) {
          feedModel.withId(action.id).update({ lastFetched: undefined })
        }
        break
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
        action.data.items.forEach((item) => {
          const feedItem = {
            // prefix ID with feed ID to prevent collisions
            id: `${action.id}${item.id || item.guid || item.link}`,
            link: item.link,
            title: item.title,
            feed: action.id,
          }
          const content = item.summary || item.contentSnippet || item.content
          if (content) {
            feedItem.content = truncate(content)
          }
          if (item.enclosure && item.enclosure.url) {
            feedItem.imageUrl = item.enclosure.url
          }
          const newFeedItem = session.FeedItem.upsert(feedItem)
          if (item.isoDate) {
            newFeedItem.update({ date: Date.parse(item.isoDate) })
          } else if (!newFeedItem.date) {
            // if no date is present, we need set Date.now() on first fetch
            newFeedItem.update({ date: Date.now() })
          }
        })
        feedModel.withId(action.id).update({
          title: action.data.title,
          link: action.data.link,
          status: FEED_STATUS.LOADED,
          error: undefined,
          lastFetched: Date.now(),
        })
        break
      case feedActionTypes.SET_USE_CORS_PROXY:
        feedModel.withId(action.id).update({ useCorsProxy: action.value })
        break
      default:
        break
    }
  }
}
