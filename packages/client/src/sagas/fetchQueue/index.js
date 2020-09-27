// Use a fetch queue, for sequential download to prevent hammering of servers

import { call, delay } from 'redux-saga/effects'
import { FETCH_QUEUE_DELAY } from 'newsdash/constants'

const queue = []

function* addToQueueSaga(saga, ...args) {
  yield call([queue, queue.push], [saga, args])
}

function* startQueueSaga() {
  while (true) {
    yield delay(1000)
    while (queue.length) {
      yield delay(FETCH_QUEUE_DELAY)
      const [saga, args] = yield call([queue, queue.shift])
      yield call(saga, ...args)
    }
  }
}

export { addToQueueSaga }
export default startQueueSaga
