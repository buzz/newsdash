import { put, select } from 'redux-saga/effects'

import feedSelectors from '../../store/selectors/feed'
import { loadFeed } from '../../store/actions/feed'

export default function* refreshFeed({ id }) {
  const feed = yield select(feedSelectors.getFeed, id)
  if (feed.url) {
    yield put(loadFeed(id, feed.url))
  }
}
