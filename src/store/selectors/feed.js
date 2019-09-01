import { createSelector } from 'redux-orm'

import orm from '../orm'
import getOrm from './orm'
import selectId from './id'

const getFeeds = createSelector(
  orm,
  getOrm,
  (session) => session.Feed.all().toRefArray()
)

const makeGetFeed = () => createSelector(
  orm,
  getOrm,
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
  getFeed: makeGetFeed(),
  getFeeds,
  makeGetFeed,
}
