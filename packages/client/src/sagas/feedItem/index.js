import { call, takeEvery } from 'redux-saga/effects'

import { actionTypes as feedActionTypes } from 'newsdash/store/actions/feed'
import loadFeedItemsImageUrlsSaga from './loadFeedItemsImageUrlsSaga'
import periodicallyPruneFeedItemsSaga from './periodicallyPruneFeedItemsSaga'

export default [
  takeEvery(feedActionTypes.LOAD_FEED_SUCCESS, loadFeedItemsImageUrlsSaga),
  call(periodicallyPruneFeedItemsSaga),
]
