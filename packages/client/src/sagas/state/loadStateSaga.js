import { call, put, select } from 'redux-saga/effects'

import { LOCALSTORAGE_FEEDITEMS_KEY, LOCALSTORAGE_SETTINGS_KEY } from 'newsdash/constants'
import { loadFromLocalStorage } from 'newsdash/store/localStorage'
import { loadState } from 'newsdash/store/actions/app'
import getApp from 'newsdash/store/selectors/app'

function* loadStateFromApiSaga() {
  try {
    const response = yield call(fetch, 'api/user/state', {
      headers: { Accept: 'application/json' },
    })
    const stateData = yield call([response, response.json])
    yield put(loadState(stateData))
  } catch (err) {
    //
  }
}

function* loadStateFromLocalStorageSaga() {
  const settings = yield call(loadFromLocalStorage, LOCALSTORAGE_SETTINGS_KEY)
  if (settings) {
    yield put(loadState(settings))
  }
  const feedItems = yield call(loadFromLocalStorage, LOCALSTORAGE_FEEDITEMS_KEY)
  if (feedItems) {
    yield put(loadState({ feedItems }))
  }
}

export default function* loadStateSaga() {
  yield call(loadStateFromLocalStorageSaga)
  const { apiPresent } = yield select(getApp)
  if (apiPresent) {
    yield call(loadStateFromApiSaga)
  }
}
