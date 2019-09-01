import { put, select } from 'redux-saga/effects'

import feedSelectors from '../../store/selectors/feed'
import { loadFeed } from '../../store/actions/feed'

const getFeed = feedSelectors.makeGetFeed()

export default function* refreshFeed({ id }) {
  const feed = yield select(getFeed, id)
  if (feed.url) {
    yield put(loadFeed(id, feed.url, feed.lastFetched))
  }
}
