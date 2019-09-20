import { call, takeEvery, takeLatest } from 'redux-saga/effects'

import { actionTypes as feedActionTypes } from 'newsdash/store/actions/feed'
import loadFeedSaga from './loadFeedSaga'
import editFeedSaga from './editFeedSaga'
import fetchFeedsSaga from './fetchFeedsSaga'
import periodicallyFetchFeedsSaga from './periodicallyFetchFeedsSaga'
import refreshFeedSaga from './refreshFeedSaga'

export default [
  takeEvery(feedActionTypes.ADD_FEED, fetchFeedsSaga),
  takeEvery(feedActionTypes.EDIT_FEED, editFeedSaga),
  takeEvery(feedActionTypes.LOAD_FEED, loadFeedSaga),
  takeLatest(feedActionTypes.REFRESH_FEED, refreshFeedSaga),
  call(periodicallyFetchFeedsSaga),
]
