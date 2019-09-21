import { call, put, select } from 'redux-saga/effects'

import { NOTIFICATION_TYPES } from 'newsdash/constants'
import { editFeedItem } from 'newsdash/store/actions/feedItem'
import { showNotification } from 'newsdash/store/actions/notification'
import feedItemSelectors from 'newsdash/store/selectors/feedItem'
import getApp from 'newsdash/store/selectors/app'

const getFeedItems = feedItemSelectors.makeGetFeedItems()

export default function* loadFeedItemsImageUrlsSaga({ id }) {
  const { apiPresent } = yield select(getApp)
  if (apiPresent) {
    const items = yield select(getFeedItems, id)
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i]
      if (item.link && !item.imageUrl) {
        try {
          const response = yield call(fetch, `api/fetch/image-url/${encodeURIComponent(item.link)}`)
          const { image: imageUrl } = yield call([response, response.json])
          yield put(editFeedItem(item.id, { imageUrl }))
        } catch (err) {
          yield put(showNotification({
            message: `Failed to fetch image for URL ${item.link}. ${err.message}`,
            title: 'Failed to fetch image URL!',
            type: NOTIFICATION_TYPES.ERROR,
          }))
        }
      }
    }
  }
}
