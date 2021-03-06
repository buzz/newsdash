import { all, call, put, select } from 'redux-saga/effects'

import { editFeedItem } from 'newsdash/store/actions/feedItem'
import feedItemSelectors from 'newsdash/store/selectors/feedItem'
import getApp from 'newsdash/store/selectors/app'

import { addToQueueSaga } from '../fetchQueue'

const getFeedItems = feedItemSelectors.makeGetFeedItems()

function* loadImageUrlSaga(id, link) {
  try {
    const response = yield call(fetch, 'api/proxy/meta-image', {
      body: JSON.stringify({ url: link }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
    if (response.ok) {
      const { image: imageUrl } = yield call([response, response.json])
      yield put(editFeedItem(id, { imageUrl }))
    }
  } catch {
    // don't spam messages about image URLs
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
        effects.push(call(addToQueueSaga, loadImageUrlSaga, itemId, link))
      }
    }
    yield all(effects)
  }
}
