import { call, put } from 'redux-saga/effects'

import { clearState, loadState } from 'newsdash/store/actions/app'

export default function* importStateSaga({ data }) {
  try {
    const settings = yield call([JSON, JSON.parse], data)
    if (settings.app && settings.feedBoxes && settings.feeds) {
      yield put(clearState())
      yield put(loadState(settings))
    }
  } catch (err) {
    // TODO
    console.error(err)
  }
}
