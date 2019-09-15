import { put, select } from 'redux-saga/effects'

import feedSelectors from 'newsdash/store/selectors/feed'
import { loadFeed } from 'newsdash/store/actions/feed'

export default function* refreshFeedSaga({ id }) {
  const feed = yield select(feedSelectors.getFeed, id)
  if (feed.url) {
    yield put(loadFeed(id, feed.url))
  }
}
