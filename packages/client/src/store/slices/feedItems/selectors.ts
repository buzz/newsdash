import { createSelector } from '@reduxjs/toolkit'

import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import selectSettings from '#store/slices/settings/selectors'
import type { RootState } from '#store/types'

import feedItemsEntityAdapter from './feedItemsEntityAdapter'

/** Adapter selectors */
const feedItemsSelectors = feedItemsEntityAdapter.getSelectors(
  (state: RootState) => state.feedItems
)

/** Select feed item IDs by tab ID. */
const selectIdsByTabId = createSelector(
  [feedItemsSelectors.selectAll, (_, tabId: string) => tabId],
  (feedItems, tabId) =>
    new Set(feedItems.filter((item) => item.tabId === tabId).map((item) => item.id))
)

/** Select old feed item IDs by tab ID. */
const selectOldFeedItemIds = createSelector(
  [selectSettings, feedItemsSelectors.selectAll, (_, tabId: string) => tabId],
  ({ itemsToKeep }, feedItems, tabId) => {
    const feedIds = new Set<string>()
    const tabItems = feedItems.filter((item) => item.tabId === tabId)

    for (const [i, { id: feedId }] of tabItems.entries()) {
      if (i >= itemsToKeep) {
        feedIds.add(feedId)
      }
    }

    return feedIds
  }
)

/** Select orphaned feed item IDs. */
const selectOrphanedFeedItemIds = createSelector(
  [tabsSelectors.selectIds, feedItemsSelectors.selectAll],
  (tabIds, feedItems) =>
    new Set(feedItems.filter((item) => !tabIds.includes(item.tabId)).map((item) => item.id))
)

export { selectIdsByTabId, selectOldFeedItemIds, selectOrphanedFeedItemIds }
export default feedItemsSelectors
