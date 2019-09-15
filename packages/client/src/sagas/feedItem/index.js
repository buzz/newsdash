import { takeEvery } from 'redux-saga/effects'

import { actionTypes as feedActionTypes } from 'newsdash/store/actions/feed'
import loadFeedItemsImageUrlsSaga from './loadFeedItemsImageUrlsSaga'

export default [
  takeEvery(feedActionTypes.LOAD_FEED_SUCCESS, loadFeedItemsImageUrlsSaga),
]
