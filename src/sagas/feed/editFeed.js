import { put } from 'redux-saga/effects'

import { loadFeed } from '../../store/actions/feed'

export default function* editFeed({ id, feed, prevFeed }) {
  if (
    feed.url !== ''
    && feed.url !== prevFeed.url
  ) {
    yield put(loadFeed(id, feed.url, feed.lastFetched))
  }
}
