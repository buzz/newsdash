import { call, put, select } from 'redux-saga/effects'

import { LOCALSTORAGE_SETTINGS_KEY, NOTIFICATION_TYPES } from 'newsdash/constants'
import { showNotification } from 'newsdash/store/actions/notification'
import restoreFeedItemsFromLocalStorageSaga from 'newsdash/sagas/feedItem/restoreFeedItemsFromLocalStorageSaga'
import { restoreSettings } from 'newsdash/store/actions/app'
import getApp from 'newsdash/store/selectors/app'

function* restoreSettingsFromApiSaga() {
  try {
    const response = yield call(fetch, 'api/user/state', {
      headers: { Accept: 'application/json' },
    })
    const settings = yield call([response, response.json])
    yield put(restoreSettings(settings))
  } catch (err) {
    yield put(showNotification({
      message: `The settings could not be loaded from the server. ${err.message}`,
      title: 'Failed to restore settings from server!',
      type: NOTIFICATION_TYPES.ERROR,
    }))
  }
}

function* restoreSettingsFromLocalStorageSaga() {
  try {
    const settingsJson = yield call([localStorage, localStorage.getItem], LOCALSTORAGE_SETTINGS_KEY)
    const settings = yield call([JSON, JSON.parse], settingsJson)
    if (settings) {
      yield put(restoreSettings(settings))
    }
  } catch (err) {
    yield put(showNotification({
      message: `Failed to restore settings from browser storage. ${err.message}`,
      title: 'Failed to restore settings!',
      type: NOTIFICATION_TYPES.ERROR,
    }))
  }
}

export default function* restoreStateSaga() {
  const { apiPresent } = yield select(getApp)
  if (apiPresent) {
    yield call(restoreSettingsFromApiSaga)
  } else {
    yield call(restoreSettingsFromLocalStorageSaga)
  }
  yield call(restoreFeedItemsFromLocalStorageSaga)
}
