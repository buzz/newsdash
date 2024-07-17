import { isAnyOf } from '@reduxjs/toolkit'

import { LOCALSTORAGE_FEEDITEMS_KEY } from '#constants'
import { debounce } from '#store/middlewares/utils'
import { addFetchedFeedItems, removeFeedItems } from '#store/slices/feedItems/actions'
import feedItemsSelectors from '#store/slices/feedItems/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const PERSIST_DELAY = 2000

/** Persist feed items on change (localStorage) */
function persistFeedItemsEffect(startListening: AppStartListening) {
  startListening({
    matcher: isAnyOf(addFetchedFeedItems, removeFeedItems),
    effect: async (action, listenerApi) => {
      await debounce(listenerApi, PERSIST_DELAY)
      const state = listenerApi.getState()
      const feedItems = feedItemsSelectors.selectAll(state).map((feedItem) => ({
        ...feedItem,
        new: false,
      }))
      const serializedFeedItems = JSON.stringify(feedItems)
      localStorage.setItem(LOCALSTORAGE_FEEDITEMS_KEY, serializedFeedItems)
    },
  })
}

export default persistFeedItemsEffect
