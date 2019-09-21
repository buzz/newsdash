import { call, select } from 'redux-saga/effects'

import {
  LOCALSTORAGE_FEEDITEMS_KEY,
  LOCALSTORAGE_SETTINGS_KEY,
  SAVE_STATE_THROTTLE_DELAY,
} from 'newsdash/constants'
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
    // TODO
    console.error(err)
  }
}

function* saveStateSaga() {
  const { apiPresent } = yield select(getApp)
  const settings = yield select(getSettingsExport)
  const settingsJson = yield call([JSON, JSON.stringify], settings)
  // save settings to API, fallback to localStorage
  if (apiPresent) {
    yield call(postStateToApiSaga, settingsJson)
  } else {
    yield call(saveToLocalStorage, LOCALSTORAGE_SETTINGS_KEY, settingsJson)
  }
  // save feedItems always to localStorage
  const feedItems = yield select(feedItemSelectors.getAllFeedItems)
  const feedItemsJson = yield call([JSON, JSON.stringify], feedItems)
  yield call(saveToLocalStorage, LOCALSTORAGE_FEEDITEMS_KEY, feedItemsJson)
}

export default function* continuouslySaveStateSaga() {
  yield trailingThrottle(SAVE_STATE_THROTTLE_DELAY, '*', saveStateSaga)
}
