import {
  all,
  call,
  put,
  select,
} from 'redux-saga/effects'

import {
  LOCALSTORAGE_FEEDITEMS_KEY,
  LOCALSTORAGE_SETTINGS_KEY,
  NOTIFICATION_TYPES,
  SAVE_STATE_THROTTLE_DELAY,
} from 'newsdash/constants'
import { showNotification } from 'newsdash/store/actions/notification'
import trailingThrottle from 'newsdash/sagas/trailingThrottle'
import { saveToLocalStorage } from 'newsdash/store/localStorage'
import getApp from 'newsdash/store/selectors/app'
import feedItemSelectors from 'newsdash/store/selectors/feedItem'
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
    yield put(showNotification({
      message: `The settings could not be saved to server. ${err.message}`,
      title: 'Could not save state to server!',
      type: NOTIFICATION_TYPES.error,
    }))
  }
}

function* saveSettingsToLocalStorageSaga(settingsJson) {
  try {
    yield call(saveToLocalStorage, LOCALSTORAGE_SETTINGS_KEY, settingsJson)
  } catch (err) {
    yield put(showNotification({
      message: `The settings could not be saved to the local browser storage. ${err.message}`,
      title: 'Could not save state to browser!',
      type: NOTIFICATION_TYPES.error,
    }))
  }
}

function* saveFeedItemsToLocalStorageSaga() {
  const feedItems = yield select(feedItemSelectors.getAllFeedItems)
  const feedItemsJson = yield call([JSON, JSON.stringify], feedItems)
  try {
    yield call(saveToLocalStorage, LOCALSTORAGE_FEEDITEMS_KEY, feedItemsJson)
  } catch (err) {
    yield put(showNotification({
      message: `The feed items could not be saved to the local browser storage. ${err.message}`,
      title: 'Could not save feed items to browser!',
      type: NOTIFICATION_TYPES.error,
    }))
  }
}

function* saveStateSaga() {
  const { apiPresent } = yield select(getApp)
  const settings = yield select(getSettingsExport)
  const settingsJson = yield call([JSON, JSON.stringify], settings)
  const effects = [
    call(saveFeedItemsToLocalStorageSaga),
    apiPresent
      ? call(postStateToApiSaga, settingsJson)
      : call(saveSettingsToLocalStorageSaga, settingsJson),
  ]
  yield all(effects)
}

export default function* continuouslySaveSettingsSaga() {
  yield trailingThrottle(SAVE_STATE_THROTTLE_DELAY, '*', saveStateSaga)
}
