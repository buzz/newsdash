import { put, select } from 'redux-saga/effects'

import { FEED_STATUS } from 'newsdash/constants'
import { loadFeed } from 'newsdash/store/actions/feed'
import feedSelectors from 'newsdash/store/selectors/feed'
import getApp from 'newsdash/store/selectors/app'

export default function* fetchFeedsSaga() {
  const { fetchInterval } = yield select(getApp)
  const feeds = yield select(feedSelectors.getFeeds)
  for (let i = 0; i < feeds.length; i += 1) {
    const feed = feeds[i]
    if ([FEED_STATUS.NEW, FEED_STATUS.LOADED].includes(feed.status)) {
      const timeSinceLastFetch = Date.now() - feed.lastFetched
      if (timeSinceLastFetch > fetchInterval) {
        yield put(loadFeed(feed.id))
      }
    }
  }
}
