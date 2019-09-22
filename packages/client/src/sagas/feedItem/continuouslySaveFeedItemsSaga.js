import { call, put, select } from 'redux-saga/effects'

import {
  LOCALSTORAGE_FEEDITEMS_KEY,
  NOTIFICATION_TYPES,
  SAVE_FEEDITEMS_THROTTLE_DELAY,
} from 'newsdash/constants'
import { actionTypes as feedItemActionTypes } from 'newsdash/store/actions/feedItem'
import { showNotification } from 'newsdash/store/actions/notification'
import feedItemSelectors from 'newsdash/store/selectors/feedItem'
import trailingThrottle from 'newsdash/sagas/trailingThrottle'

function* saveFeedItemsToLocalStorageSaga() {
  const feedItems = yield select(feedItemSelectors.getAllFeedItems)
  const feedItemsJson = yield call([JSON, JSON.stringify], feedItems)
  try {
    yield call([localStorage, localStorage.setItem], LOCALSTORAGE_FEEDITEMS_KEY, feedItemsJson)
  } catch (err) {
    yield put(showNotification({
      message: `The feed items could not be saved to the local browser storage. ${err.message}`,
      title: 'Could not save feed items to browser!',
      type: NOTIFICATION_TYPES.error,
    }))
  }
}

export default function* continuouslySaveFeedItemsSaga() {
  yield trailingThrottle(
    SAVE_FEEDITEMS_THROTTLE_DELAY,
    [
      feedItemActionTypes.EDIT_FEED_ITEM,
      feedItemActionTypes.PARSE_FEED_ITEMS,
      feedItemActionTypes.PRUNE,
    ],
    saveFeedItemsToLocalStorageSaga
  )
}
