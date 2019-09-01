import { call, takeEvery, takeLatest } from 'redux-saga/effects'

import editFeedSaga from './editFeed'
import loadFeedSaga from './loadFeed'
import periodicallyFetchFeedsSaga from './periodicallyFetchFeedsSaga'
import refreshFeedSaga from './refreshFeed'
import { actionTypes as feedActionTypes } from '../../store/actions/feed'

export default [
  takeEvery(feedActionTypes.EDIT_FEED, editFeedSaga),
  takeEvery(feedActionTypes.LOAD_FEED, loadFeedSaga),
  takeLatest(feedActionTypes.REFRESH_FEED, refreshFeedSaga),
  call(periodicallyFetchFeedsSaga),
]
