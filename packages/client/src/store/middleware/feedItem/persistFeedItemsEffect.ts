import { isAnyOf } from '@reduxjs/toolkit'

import { saveFeedItems } from '#store/middleware/db'
import { addAppListener, debounce } from '#store/middleware/utils'
import { addFetchedFeedItems, removeFeedItems } from '#store/slices/feedItems/actions'
import feedItemsSelectors from '#store/slices/feedItems/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

const PERSIST_DELAY = 2000

// Persist feed items to IndexedDB.
function persistFeedItemsEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      matcher: isAnyOf(addFetchedFeedItems, removeFeedItems),
      effect: async (action, listenerApi) => {
        await debounce(listenerApi, PERSIST_DELAY)

        const feedItems = feedItemsSelectors.selectAll(listenerApi.getState())
        await saveFeedItems(feedItems)
      },
    })
  )
}

export default persistFeedItemsEffect
