import { call, put, select } from 'redux-saga/effects'

import { loadFeedFailure, loadFeedSuccess } from '../../store/actions/feed'
import getApp from '../../store/selectors/app'
import fetchFeed from '../../api'

export default function* loadFeed({ id, url }) {
  const { corsProxy } = yield select(getApp)
  try {
    yield put(loadFeedSuccess(id, yield call(fetchFeed, url, corsProxy)))
  } catch (e) {
    yield put(loadFeedFailure(id, e.message))
  }
}
