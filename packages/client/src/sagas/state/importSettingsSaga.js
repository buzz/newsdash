import { call, put } from 'redux-saga/effects'

import { NOTIFICATION_TYPES } from 'newsdash/constants'
import {
  clearState,
  restoreAppSettings,
  restoreFeeds,
} from 'newsdash/store/actions/app'
import { showNotification } from 'newsdash/store/actions/notification'
import checkApiPresenceSaga from '../checkApiPresenceSaga'

export default function* importSettingsSaga({ data }) {
  try {
    const settings = yield call([JSON, JSON.parse], data)
    if (settings.app && settings.feedBoxes && settings.feeds) {
      yield put(clearState())
      yield call(checkApiPresenceSaga)
      yield put(restoreAppSettings(settings.app))
      yield put(restoreFeeds(settings))
      yield put(showNotification({ title: 'Settings successfully imported!' }))
    } else {
      throw new Error('JSON data needs three keys: app, feedBoxes and feeds.')
    }
  } catch (err) {
    yield put(
      showNotification({
        message: err.message,
        title: 'Could not import settings!',
        type: NOTIFICATION_TYPES.ERROR,
      })
    )
  }
}
