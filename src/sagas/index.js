import { all } from 'redux-saga/effects'

import feedSagas from './feed'

export default function* rootSaga() {
  yield all([
    ...feedSagas,
  ])
}
