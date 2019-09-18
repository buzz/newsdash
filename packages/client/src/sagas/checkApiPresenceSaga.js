import { call, put } from 'redux-saga/effects'

import { editApp } from 'newsdash/store/actions/app'

export default function* checkApiPresenceSaga() {
  try {
    const response = yield call(fetch, 'api/version')
    if (response.status !== 200) {
      throw new Error()
    }
    const { name } = yield call([response, response.json])
    if (name !== 'newsdash') {
      throw new Error()
    }
    yield put(editApp({ apiPresent: true }))
  } catch {
    yield put(editApp({ apiPresent: false }))
  }
}
