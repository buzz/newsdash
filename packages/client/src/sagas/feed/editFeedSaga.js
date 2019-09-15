import { call, put } from 'redux-saga/effects'

import { loadFeed } from 'newsdash/store/actions/feed'

export default function* fetchFeedsSaga({ id, attrs }) {
  const attrsKeys = yield call([Object, Object.keys], attrs)
  const urlChanged = yield call([attrsKeys, attrsKeys.includes], 'url')
  if (urlChanged) {
    yield put(loadFeed(id, attrs.url))
  }
}
