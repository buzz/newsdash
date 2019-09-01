import { put } from 'redux-saga/effects'

import { loadFeed, setUseCorsProxy } from '../../store/actions/feed'
import { prune } from '../../store/actions/feedItem'

export default function* editFeed({ id, feed, prevFeed }) {
  if (
    feed.url !== ''
    && feed.url !== prevFeed.url
  ) {
    yield put(setUseCorsProxy(id, false))
    yield put(prune(id))
    yield put(loadFeed(id, feed.url))
  }
}
