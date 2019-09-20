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
    ? `api/fetch/feed/${yield call(encodeURIComponent, feedUrl)}`
    : `${corsProxy}${feedUrl}`

  try {
    const response = yield call(fetch, fetchUrl)
    if (!response.ok) {
      const err = new Error()
      err.response = response
      throw err
    }
    const text = yield call([response, response.text])
    try {
      yield put(loadFeedSuccess(id, yield call([parser, parser.parseString], text)))
    } catch (e) {
      yield put(loadFeedFailure(id, `Could not parse feed XML: ${e.message}`))
    }
  } catch (err) {
    if (err.response) {
      yield put(loadFeedFailure(id, `${err.response.status} ${err.response.statusText}`))
    } else {
      yield put(loadFeedFailure(id, err.message))
    }
  }
}
