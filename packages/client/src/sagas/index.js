import { all, call } from 'redux-saga/effects'

import checkApiPresenceSaga from './checkApiPresenceSaga'
import feedItemSagas from './feedItem'
import feedSagas from './feed'
import stateSagas from './state'
import loadStateSaga from './state/loadStateSaga'

export default function* rootSaga() {
  yield call(checkApiPresenceSaga)
  yield call(loadStateSaga)
  yield all([
    ...feedItemSagas,
    ...feedSagas,
    ...stateSagas,
  ])
}
