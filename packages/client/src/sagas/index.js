import { all, call, fork } from 'redux-saga/effects'

import checkApiPresenceSaga from './checkApiPresenceSaga'
import feedItemSagas from './feedItem'
import feedSagas from './feed'
import startQueueSaga from './fetchQueue'
import stateSagas from './state'
import restoreStateSaga from './state/restoreStateSaga'

export default function* rootSaga() {
  yield fork(startQueueSaga)
  yield call(checkApiPresenceSaga)
  yield call(restoreStateSaga)
  yield all([...feedItemSagas, ...feedSagas, ...stateSagas])
}
