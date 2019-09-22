import { Model, attr, fk } from 'redux-orm'

import { MAX_CONTENT_LENGTH } from 'newsdash/constants'
import { actionTypes as appActionTypes } from 'newsdash/store/actions/app'
import { actionTypes as feedItemActionTypes } from 'newsdash/store/actions/feedItem'

const truncate = (text) => (
  text.length > MAX_CONTENT_LENGTH
    ? `${text.substring(0, MAX_CONTENT_LENGTH)}…`
    : text
)

export default class FeedItem extends Model {
  static get modelName() {
    return 'FeedItem'
  }

  static get fields() {
    return {
      id: attr(),
      link: attr(),
      date: attr(),
      title: attr(),
      content: attr(),
      imageUrl: attr(),
      new: attr({ getDefault: () => true }),
      feed: fk('Feed', 'items'),
    }
  }

  static reducer(action, feedItemModel, session) {
    switch (action.type) {
      case feedItemActionTypes.EDIT_FEED_ITEM:
        feedItemModel.withId(action.id).update(action.attrs)
        break

      case appActionTypes.LOAD_STATE:
        if (action.data.feedItems) {
          action.data.feedItems.forEach(
            (feeditem) => feedItemModel.upsert(feeditem)
          )
        }
        break

      case feedItemActionTypes.PARSE_FEED_ITEMS:
        if (action.items) {
          const feed = session.Feed.withId(action.feedId)
          // set new=false on all old feed items
          feed.items.toModelArray().forEach(
            (feedItem) => feedItem.update({ new: false })
          )

          action.items.forEach((item) => {
            const feedItem = {
              // prefix ID with feed ID to prevent collisions
              id: `${feed.id}${item.id || item.guid || item.link}`,
              link: item.link,
              title: item.title,
              feed: feed.id,
            }
            const content = item.summary || item.contentSnippet || item.content
            if (content) {
              feedItem.content = truncate(content)
            }
            const newFeedItem = session.FeedItem.upsert(feedItem)
            if (item.isoDate) {
              newFeedItem.update({ date: Date.parse(item.isoDate) })
            } else if (!newFeedItem.date) {
              // if no date is present, we need set Date.now() on first fetch
              newFeedItem.update({ date: Date.now() })
            }
          })
        }
        break

      case feedItemActionTypes.PRUNE: {
        // keep only n items per feed
        const { feedItemsToKeep } = session.App.first().ref
        session
          .Feed
          .all()
          .toModelArray()
          .forEach(
            (feed) => feed
              .items
              .toModelArray()
              .sort((a, b) => b.date - a.date) // sort by date
              .forEach((feedItem, i) => {
                if (i >= feedItemsToKeep) {
                  feedItem.delete()
                }
              })
          )
        // remove orphan feedItems (that don't have a feed)
        feedItemModel
          .all()
          .toModelArray()
          .filter((feedItem) => !feedItem.feed)
          .forEach((feedItem) => feedItem.delete())
        break
      }

      default:
        break
    }
  }
}
