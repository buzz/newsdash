import { call, takeEvery, takeLatest } from 'redux-saga/effects'

import { actionTypes as feedActionTypes } from 'newsdash/store/actions/feed'
import loadFeedSaga from './loadFeed'
import editFeedSaga from './editFeedSaga'
import fetchFeedsSaga from './fetchFeedsSaga'
import periodicallyFetchFeedsSaga from './periodicallyFetchFeedsSaga'
import periodicallyPruneFeedItemsSaga from './periodicallyPruneFeedItemsSaga'
import refreshFeedSaga from './refreshFeed'

export default [
  takeEvery(feedActionTypes.ADD_FEED, fetchFeedsSaga),
  takeEvery(feedActionTypes.EDIT_FEED, editFeedSaga),
  takeEvery(feedActionTypes.LOAD_FEED, loadFeedSaga),
  takeLatest(feedActionTypes.REFRESH_FEED, refreshFeedSaga),
  call(periodicallyFetchFeedsSaga),
  call(periodicallyPruneFeedItemsSaga),
]
