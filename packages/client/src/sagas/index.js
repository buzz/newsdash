import { all, call } from 'redux-saga/effects'

import feedItemSagas from './feedItem'
import feedSagas from './feed'
import loadStateSaga from './state/loadStateSaga'
import continuouslySaveStateSaga from './state/continuouslySaveStateSaga'

export default function* rootSaga() {
  yield call(loadStateSaga)
  yield all([
    ...feedItemSagas,
    ...feedSagas,
    call(continuouslySaveStateSaga),
  ])
}
