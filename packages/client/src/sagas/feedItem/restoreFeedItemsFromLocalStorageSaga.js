import { call, put } from 'redux-saga/effects'

import { NOTIFICATION_TYPES, LOCALSTORAGE_FEEDITEMS_KEY } from 'newsdash/constants'
import { restoreFeedItems } from 'newsdash/store/actions/feedItem'
import { showNotification } from 'newsdash/store/actions/notification'

export default function* restoreFeedItemsFromLocalStorageSaga() {
  try {
    const feedItemsJson = yield call(
      [localStorage, localStorage.getItem], LOCALSTORAGE_FEEDITEMS_KEY
    )
    const feedItems = yield call([JSON, JSON.parse], feedItemsJson)
    if (feedItems) {
      yield put(restoreFeedItems(feedItems))
    }
  } catch (err) {
    yield put(showNotification({
      message: `Failed to restore feed items from browser storage. ${err.message}`,
      title: 'Failed to restore feed items!',
      type: NOTIFICATION_TYPES.ERROR,
    }))
  }
}
