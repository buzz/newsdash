import { isAnyOf } from '@reduxjs/toolkit'

import { saveFeedItems } from '#store/middlewares/db'
import { debounce } from '#store/middlewares/utils'
import { addFetchedFeedItems, removeFeedItems } from '#store/slices/feedItems/actions'
import feedItemsSelectors from '#store/slices/feedItems/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const PERSIST_DELAY = 2000

/** Persist feed items to IndexedDB */
function persistFeedItemsEffect(startListening: AppStartListening) {
  startListening({
    matcher: isAnyOf(addFetchedFeedItems, removeFeedItems),
    effect: async (action, listenerApi) => {
      await debounce(listenerApi, PERSIST_DELAY)

      const feedItems = feedItemsSelectors.selectAll(listenerApi.getState()).map((feedItem) => ({
        ...feedItem,
        new: false,
      }))
      await saveFeedItems(feedItems)
    },
  })
}

export default persistFeedItemsEffect
