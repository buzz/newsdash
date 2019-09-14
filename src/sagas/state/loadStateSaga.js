import { call, put } from 'redux-saga/effects'

import { load } from 'newsdash/store/localStorage'
import { loadState } from 'newsdash/store/actions/app'

export default function* loadStateSaga() {
  const orm = yield call(load, 'orm')
  if (orm) {
    yield put(loadState(orm))
  }
}
