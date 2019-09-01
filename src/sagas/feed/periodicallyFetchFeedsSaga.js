import { delay, put, select } from 'redux-saga/effects'

import { FEED_STATUS } from '../../constants'
import { loadFeed } from '../../store/actions/feed'
import feedSelectors from '../../store/selectors/feed'
import getApp from '../../store/selectors/app'

export default function* periodicallyFetchFeedsSaga() {
  while (true) {
    const { fetchInterval } = yield select(getApp)
    const feeds = yield select(feedSelectors.getFeeds)
    for (let i = 0; i < feeds.length; i += 1) {
      const feed = feeds[i]
      if (feed.status === FEED_STATUS.LOADED) {
        const timeSinceLastFetch = Date.now() - feed.lastFetched
        if (timeSinceLastFetch > fetchInterval) {
          yield put(loadFeed(feed.id))
        }
      }
    }
    yield delay(30000)
  }
}
