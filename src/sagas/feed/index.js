import { takeEvery } from 'redux-saga/effects'

import addFeedSaga from './addFeed'
import editFeedSaga from './editFeed'
import loadFeedSaga from './loadFeed'
import { actionTypes as feedActionTypes } from '../../store/actions/feed'

export default [
  takeEvery(feedActionTypes.ADD_FEED, addFeedSaga),
  takeEvery(feedActionTypes.EDIT_FEED, editFeedSaga),
  takeEvery(feedActionTypes.LOAD_FEED, loadFeedSaga),
]
