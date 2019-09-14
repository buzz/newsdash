import { delay, put } from 'redux-saga/effects'

import { PRUNE_INTERVAL } from 'newsdash/constants'
import { prune } from 'newsdash/store/actions/feedItem'

export default function* periodicallyPruneFeedItemsSaga() {
  while (true) {
    yield put(prune())
    yield delay(PRUNE_INTERVAL)
  }
}
