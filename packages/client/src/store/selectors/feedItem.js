import { createSelector } from 'redux-orm'

import orm from 'newsdash/store/orm'
import getOrm from './orm'
import selectId from './id'

const getAllFeedItems = createSelector(
  orm,
  getOrm,
  (session) => session
    .FeedItem
    .all()
    .toRefArray()
)

const makeGetFeedItems = () => createSelector(
  orm,
  getOrm,
  selectId,
  (session, id) => {
    const feed = session.Feed.withId(id)
    return feed
      ? feed
        .items
        .toRefArray()
        .sort((a, b) => b.date - a.date) // sort by date
      : []
  }
)

export default {
  getAllFeedItems,
  makeGetFeedItems,
}
