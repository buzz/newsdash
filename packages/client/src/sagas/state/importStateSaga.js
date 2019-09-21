import { call, put } from 'redux-saga/effects'

import { NOTIFICATION_TYPES } from 'newsdash/constants'
import { clearState, loadState } from 'newsdash/store/actions/app'
import { showNotification } from 'newsdash/store/actions/notification'

export default function* importStateSaga({ data }) {
  try {
    const settings = yield call([JSON, JSON.parse], data)
    if (settings.app && settings.feedBoxes && settings.feeds) {
      yield put(clearState())
      yield put(loadState(settings))
      yield put(showNotification({ title: 'Settings successfully imported!' }))
    } else {
      throw new Error('JSON data needs three keys: app, feedBoxes and feeds.')
    }
  } catch (err) {
    yield put(showNotification({
      message: err.message,
      title: 'Could not import settings!',
      type: NOTIFICATION_TYPES.ERROR,
    }))
  }
}
