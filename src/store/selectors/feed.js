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
  (session, url) => {
    const feed = session.Feed.withId(url)
    return feed
      ? feed.ref
      : {
        title: 'Loading…',
        link: null,
      }
  }
)

export default {
  getFeeds,
  makeGetFeed,
}
