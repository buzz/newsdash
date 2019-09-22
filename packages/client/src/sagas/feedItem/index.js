import { call, takeEvery } from 'redux-saga/effects'

import { actionTypes as feedItemActionTypes } from 'newsdash/store/actions/feedItem'
import loadFeedItemsImageUrlsSaga from './loadFeedItemsImageUrlsSaga'
import periodicallyPruneFeedItemsSaga from './periodicallyPruneFeedItemsSaga'

export default [
  takeEvery(feedItemActionTypes.PARSE_FEED_ITEMS, loadFeedItemsImageUrlsSaga),
  call(periodicallyPruneFeedItemsSaga),
]
