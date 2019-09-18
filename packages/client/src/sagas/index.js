import { all, call } from 'redux-saga/effects'

import checkApiPresenceSaga from './checkApiPresenceSaga'
import feedItemSagas from './feedItem'
import feedSagas from './feed'
import loadStateSaga from './state/loadStateSaga'
import continuouslySaveStateSaga from './state/continuouslySaveStateSaga'

export default function* rootSaga() {
  yield all([
    call(loadStateSaga),
    call(checkApiPresenceSaga),
  ])
  yield all([
    ...feedItemSagas,
    ...feedSagas,
    call(continuouslySaveStateSaga),
  ])
}
