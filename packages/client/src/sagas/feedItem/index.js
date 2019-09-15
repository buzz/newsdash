import { takeEvery } from 'redux-saga/effects'

import { actionTypes as feedActionTypes } from 'newsdash/store/actions/feed'
import loadfeedItemsImageUrls from './loadfeedItemsImageUrls'

export default [
  takeEvery(feedActionTypes.LOAD_FEED_SUCCESS, loadfeedItemsImageUrls),
]
