import { call, put, select } from 'redux-saga/effects'

import feedItemSelectors from 'newsdash/store/selectors/feedItem'
import { editFeedItem } from 'newsdash/store/actions/feedItem'

const getFeedItems = feedItemSelectors.makeGetFeedItems()

export default function* loadFeedItemsImageUrlsSaga({ id }) {
  const items = yield select(getFeedItems, id)
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i]
    if (item.link && !item.imageUrl) {
      try {
        const response = yield call(fetch, `api/image/${encodeURIComponent(item.link)}`)
        const { image: imageUrl } = yield call([response, response.json])
        yield put(editFeedItem(item.id, { imageUrl }))
      } catch {
        // do nothing
      }
    }
  }
}
