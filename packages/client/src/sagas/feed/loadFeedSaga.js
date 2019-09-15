import { call, put, select } from 'redux-saga/effects'
import Parser from 'rss-parser'

import feedSelectors from 'newsdash/store/selectors/feed'
import { loadFeedFailure, loadFeedSuccess } from 'newsdash/store/actions/feed'

const parser = new Parser()

export default function* loadFeedSaga({ id, url }) {
  const feed = yield select(feedSelectors.getFeed, id)
  const encodedUrl = yield call(encodeURIComponent, url || feed.url)
  const fetchUrl = `api/fetch-feed/${encodedUrl}`

  try {
    yield put(loadFeedSuccess(id, yield call([parser, parser.parseURL], fetchUrl)))
  } catch (e) {
    yield put(loadFeedFailure(id, e.message))
  }
}
