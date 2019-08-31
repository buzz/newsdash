import { takeLatest } from 'redux-saga/effects'

import loadFeedSaga from './loadFeed'
import { actionTypes as feedActionTypes } from '../../store/actions/feed'

export default [
  takeLatest(feedActionTypes.LOAD_FEED, loadFeedSaga),
]
