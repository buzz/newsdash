import { call, put, select } from 'redux-saga/effects'
import Parser from 'rss-parser'

import { NOTIFICATION_TYPES } from 'newsdash/constants'
import { loadFeedFailure, loadFeedSuccess } from 'newsdash/store/actions/feed'
import { showNotification } from 'newsdash/store/actions/notification'
import getApp from 'newsdash/store/selectors/app'
import feedSelectors from 'newsdash/store/selectors/feed'

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
    } catch (err) {
      const message = `Could not parse feed XML: ${err.message}`
      yield put(loadFeedFailure(id, message))
      yield put(showNotification({
        message: `Failed to parse data for ${feedUrl}. ${message}`,
        title: 'Failed to fetch feed!',
        type: NOTIFICATION_TYPES.ERROR,
      }))
    }
  } catch (err) {
    if (err.response) {
      const message = `${err.response.status} ${err.response.statusText}`
      yield put(loadFeedFailure(id, message))
      yield put(showNotification({
        message: `Failed to fetch URL ${feedUrl}. ${message}`,
        title: 'Failed to fetch feed!',
        type: NOTIFICATION_TYPES.ERROR,
      }))
    } else {
      yield put(loadFeedFailure(id, err.message))
      yield put(showNotification({
        message: `Failed to fetch URL ${feedUrl}. ${err.message}`,
        title: 'Failed to fetch feed!',
        type: NOTIFICATION_TYPES.ERROR,
      }))
    }
  }
}
