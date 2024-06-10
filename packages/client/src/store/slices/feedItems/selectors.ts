import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '#store/types'

import feedItemsEntityAdapter from './feedItemsEntityAdapter'

/** Adapter selectors */
const feedItemsSelectors = feedItemsEntityAdapter.getSelectors(
  (state: RootState) => state.feedItems
)

/** Select feed items by tab ID. */
const selectByTabId = createSelector(
  [feedItemsSelectors.selectAll, (_, tabId: string) => tabId],
  (feedItems, tabId) => feedItems.filter((feedItem) => feedItem.tabId === tabId)
)

export { selectByTabId }
export default feedItemsSelectors
