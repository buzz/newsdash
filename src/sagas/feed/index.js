import { call, takeEvery, takeLatest } from 'redux-saga/effects'

import loadFeedSaga from './loadFeed'
import periodicallyFetchFeedsSaga, { fetchFeedsSaga } from './periodicallyFetchFeedsSaga'
import refreshFeedSaga from './refreshFeed'
import { actionTypes as feedActionTypes } from '../../store/actions/feed'

export default [
  takeEvery(feedActionTypes.ADD_FEED, fetchFeedsSaga),
  takeEvery(feedActionTypes.LOAD_FEED, loadFeedSaga),
  takeLatest(feedActionTypes.REFRESH_FEED, refreshFeedSaga),
  call(periodicallyFetchFeedsSaga),
]
