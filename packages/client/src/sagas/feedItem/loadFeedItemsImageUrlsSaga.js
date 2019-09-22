import {
  all,
  call,
  put,
  select,
} from 'redux-saga/effects'

import { NOTIFICATION_TYPES } from 'newsdash/constants'
import { editFeedItem } from 'newsdash/store/actions/feedItem'
import { showNotification } from 'newsdash/store/actions/notification'
import feedItemSelectors from 'newsdash/store/selectors/feedItem'
import getApp from 'newsdash/store/selectors/app'

const getFeedItems = feedItemSelectors.makeGetFeedItems()

function* loadImageUrlSaga(id, link) {
  try {
    const response = yield call(fetch, `api/fetch/image-url/${encodeURIComponent(link)}`)
    if (!response.ok) {
      let message = ''
      try {
        const responseObj = yield call([response, response.json])
        message = responseObj.error
      } catch {
        //
      }
      throw new Error(message)
    }
    const { image: imageUrl } = yield call([response, response.json])
    yield put(editFeedItem(id, { imageUrl }))
  } catch (err) {
    yield put(showNotification({
      message: `Failed to fetch image for URL ${link}. ${err.message}`,
      title: 'Failed to fetch image URL!',
      type: NOTIFICATION_TYPES.ERROR,
    }))
  }
}

export default function* loadFeedItemsImageUrlsSaga({ feedId }) {
  const { apiPresent } = yield select(getApp)
  if (apiPresent) {
    const items = yield select(getFeedItems, feedId)
    const effects = []
    for (let i = 0; i < items.length; i += 1) {
      const { id: itemId, imageUrl, link } = items[i]
      if (link && !imageUrl) {
        effects.push(call(loadImageUrlSaga, itemId, link))
      }
    }
    yield all(effects)
  }
}
