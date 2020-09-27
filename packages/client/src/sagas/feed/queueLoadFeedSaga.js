import { call } from 'redux-saga/effects'

import { addToQueueSaga } from '../fetchQueue'
import loadFeedSaga from './loadFeedSaga'

export default function* queueLoadFeedSaga(action) {
  yield call(addToQueueSaga, loadFeedSaga, action)
}
