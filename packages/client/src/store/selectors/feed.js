import { createSelector } from 'redux-orm'

import orm from 'newsdash/store/orm'
import selectId from './id'

const getFeeds = createSelector(
  orm,
  (session) => session.Feed.all().toRefArray()
)

const getFeed = createSelector(
  orm,
  selectId,
  (session, id) => {
    const feed = session.Feed.withId(id)
    return feed
      ? feed.ref
      : {
        title: 'Loading…',
        link: null,
      }
  }
)

export default {
  getFeed,
  getFeeds,
}
