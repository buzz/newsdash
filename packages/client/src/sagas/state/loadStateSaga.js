import { call, put, select } from 'redux-saga/effects'

import {
  LOCALSTORAGE_FEEDITEMS_KEY,
  LOCALSTORAGE_SETTINGS_KEY,
  NOTIFICATION_TYPES,
} from 'newsdash/constants'
import { loadFromLocalStorage } from 'newsdash/store/localStorage'
import { showNotification } from 'newsdash/store/actions/notification'
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
    yield put(showNotification({
      message: `The settings could not be loaded from the server. ${err.message}`,
      title: 'Could not load settings from server!',
      type: NOTIFICATION_TYPES.ERROR,
    }))
  }
}

function* loadFeedItemsFromLocalStorageSaga() {
  const feedItems = yield call(loadFromLocalStorage, LOCALSTORAGE_FEEDITEMS_KEY)
  if (feedItems) {
    yield put(loadState({ feedItems }))
  }
}

function* loadStateFromLocalStorageSaga() {
  const settings = yield call(loadFromLocalStorage, LOCALSTORAGE_SETTINGS_KEY)
  if (settings) {
    yield put(loadState(settings))
  }
}

export default function* loadStateSaga() {
  const { apiPresent } = yield select(getApp)
  if (apiPresent) {
    yield call(loadStateFromApiSaga)
  } else {
    yield call(loadStateFromLocalStorageSaga)
  }
  yield call(loadFeedItemsFromLocalStorageSaga)
}
