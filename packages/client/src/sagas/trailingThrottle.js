import { buffers } from 'redux-saga'
import { actionChannel, delay, flush, fork, take } from 'redux-saga/effects'

export default function* trailingThrottle(ms, pattern, worker, ...args) {
  const task = yield fork(function* trailingThrottleTask() {
    const throttleChannel = yield actionChannel(pattern, buffers.sliding(1))
    for (;;) {
      const leadingAction = yield take(throttleChannel)
      yield delay(ms)
      const [action] = yield flush(throttleChannel)
      yield fork(worker, ...args, action || leadingAction)
    }
  })
  return task
}
