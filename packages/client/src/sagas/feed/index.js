import { call, takeEvery, takeLatest } from 'redux-saga/effects'

import { actionTypes as feedActionTypes } from 'newsdash/store/actions/feed'
import editFeedSaga from './editFeedSaga'
import fetchFeedsSaga from './fetchFeedsSaga'
import queueLoadFeedSaga from './queueLoadFeedSaga'
import loadFeedSuccessSaga from './loadFeedSuccessSaga'
import periodicallyFetchFeedsSaga from './periodicallyFetchFeedsSaga'
import refreshFeedSaga from './refreshFeedSaga'

export default [
  takeEvery(feedActionTypes.ADD_FEED, fetchFeedsSaga),
  takeEvery(feedActionTypes.EDIT_FEED, editFeedSaga),
  takeEvery(feedActionTypes.LOAD_FEED_SUCCESS, loadFeedSuccessSaga),
  takeEvery(feedActionTypes.LOAD_FEED, queueLoadFeedSaga),
  takeLatest(feedActionTypes.REFRESH_FEED, refreshFeedSaga),
  call(periodicallyFetchFeedsSaga),
]
