import { call, put } from 'redux-saga/effects'

import { load } from '../../store/localStorage'
import { loadState } from '../../store/actions/app'

export default function* loadStateSaga() {
  const orm = yield call(load, 'orm')
  if (orm) {
    yield put(loadState(orm))
  }
}
