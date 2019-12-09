import { call, put, select } from 'redux-saga/effects'

import {
  LOCALSTORAGE_SETTINGS_KEY,
  NOTIFICATION_TYPES,
  SAVE_STATE_THROTTLE_DELAY,
} from 'newsdash/constants'
import { actionTypes as appActionTypes } from 'newsdash/store/actions/app'
import { actionTypes as feedActionTypes } from 'newsdash/store/actions/feed'
import { actionTypes as feedBoxActionTypes } from 'newsdash/store/actions/feedBox'
import { showNotification } from 'newsdash/store/actions/notification'
import trailingThrottle from 'newsdash/sagas/trailingThrottle'
import getApp from 'newsdash/store/selectors/app'
import getSettingsExport from 'newsdash/store/selectors/getSettingsExport'

function* postStateToApiSaga(settingsJson) {
  try {
    yield call(fetch, 'api/user/state', {
      body: settingsJson,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  } catch (err) {
    yield put(
      showNotification({
        message: `The settings could not be saved to server. ${err.message}`,
        title: 'Could not save state to server!',
        type: NOTIFICATION_TYPES.error,
      })
    )
  }
}

function* saveSettingsToLocalStorageSaga(settingsJson) {
  try {
    yield call(
      [localStorage, localStorage.setItem],
      LOCALSTORAGE_SETTINGS_KEY,
      settingsJson
    )
  } catch (err) {
    yield put(
      showNotification({
        message: `The settings could not be saved to the local browser storage. ${err.message}`,
        title: 'Could not save state to browser!',
        type: NOTIFICATION_TYPES.error,
      })
    )
  }
}

function* saveStateSaga() {
  const { apiPresent } = yield select(getApp)
  const settings = yield select(getSettingsExport)
  const settingsJson = yield call([JSON, JSON.stringify], settings)
  yield apiPresent
    ? call(postStateToApiSaga, settingsJson)
    : call(saveSettingsToLocalStorageSaga, settingsJson)
}

export default function* continuouslySaveSettingsSaga() {
  yield trailingThrottle(
    SAVE_STATE_THROTTLE_DELAY,
    [
      appActionTypes.CLEAR_STATE,
      appActionTypes.EDIT_APP,
      appActionTypes.RESTORE_SETTINGS,
      feedActionTypes.ADD_FEED,
      feedActionTypes.EDIT_FEED,
      feedActionTypes.LOAD_FEED_SUCCESS,
      feedBoxActionTypes.ADD_FEED_BOX,
      feedBoxActionTypes.DELETE_FEED_BOX,
      feedBoxActionTypes.EDIT_FEED_BOX,
    ],
    saveStateSaga
  )
}
