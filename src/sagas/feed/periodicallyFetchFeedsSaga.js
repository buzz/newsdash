import { call, delay } from 'redux-saga/effects'

import { FETCH_CHECK_INTERVAL } from '../../constants'
import fetchFeedsSaga from './fetchFeedsSaga'

export default function* periodicallyFetchFeedsSaga() {
  while (true) {
    yield call(fetchFeedsSaga)
    yield delay(FETCH_CHECK_INTERVAL)
  }
}
