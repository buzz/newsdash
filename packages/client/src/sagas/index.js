import { all, call } from 'redux-saga/effects'

import checkApiPresenceSaga from './checkApiPresenceSaga'
import feedItemSagas from './feedItem'
import feedSagas from './feed'
import stateSagas from './state'
import restoreStateSaga from './state/restoreStateSaga'

export default function* rootSaga() {
  yield call(checkApiPresenceSaga)
  yield call(restoreStateSaga)
  yield all([
    ...feedItemSagas,
    ...feedSagas,
    ...stateSagas,
  ])
}
