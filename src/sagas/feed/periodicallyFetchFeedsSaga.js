import {
  call,
  delay,
  put,
  select,
} from 'redux-saga/effects'

import { FEED_STATUS } from '../../constants'
import { loadFeed } from '../../store/actions/feed'
import feedSelectors from '../../store/selectors/feed'
import getApp from '../../store/selectors/app'

export function* fetchFeedsSaga() {
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

export default function* periodicallyFetchFeedsSaga() {
  while (true) {
    call(fetchFeedsSaga)
    yield delay(30000)
  }
}
