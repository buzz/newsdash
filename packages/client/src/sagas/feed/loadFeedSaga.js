import { call, put, select } from 'redux-saga/effects'
import Parser from 'rss-parser'

import getApp from 'newsdash/store/selectors/app'
import feedSelectors from 'newsdash/store/selectors/feed'
import { loadFeedFailure, loadFeedSuccess } from 'newsdash/store/actions/feed'

const parser = new Parser()

export default function* loadFeedSaga({ id, url }) {
  const { apiPresent, corsProxy } = yield select(getApp)
  const feed = yield select(feedSelectors.getFeed, id)
  const feedUrl = url || feed.url
  const fetchUrl = apiPresent
    ? `api/fetch-feed/${yield call(encodeURIComponent, feedUrl)}`
    : `${corsProxy}${feedUrl}`

  try {
    yield put(loadFeedSuccess(id, yield call([parser, parser.parseURL], fetchUrl)))
  } catch (e) {
    yield put(loadFeedFailure(id, e.message))
  }
}
