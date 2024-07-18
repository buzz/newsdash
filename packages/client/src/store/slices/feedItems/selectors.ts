import { createSelector } from '@reduxjs/toolkit'

import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import selectSettings from '#store/slices/settings/selectors'
import type { RootState } from '#store/types'

import feedItemsEntityAdapter from './feedItemsEntityAdapter'

/** Adapter selectors */
const feedItemsSelectors = feedItemsEntityAdapter.getSelectors(
  (state: RootState) => state.feedItems
)

/** Select feed items by tab ID. */
const selectByTabId = createSelector(
  [feedItemsSelectors.selectAll, (_: RootState, tabId: string) => tabId],
  (tabs, tabId) => tabs.filter((item) => item.tabId === tabId)
)

/** Select feed item IDs by tab ID. */
const selectIdsByTabId = createSelector(
  [selectByTabId],
  (feedItems) => new Set(feedItems.map((item) => item.id))
)

/** Select old feed item IDs. */
const selectOldFeedItemIds = createSelector(
  [selectSettings, tabsSelectors.selectAll, feedItemsSelectors.selectAll],
  ({ itemsToKeep }, tabs, feedItems) => {
    const feedIds = new Set<string>()

    for (const tab of tabs) {
      const tabItems = feedItems.filter((item) => item.tabId === tab.id)

      for (const [i, { id: feedId }] of tabItems.entries()) {
        if (i >= itemsToKeep) {
          feedIds.add(feedId)
        }
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

/** Select old and orphaned feed item IDs. */
const selectOldAndOrphanedFeedItemIds = createSelector(
  [selectOldFeedItemIds, selectOrphanedFeedItemIds],
  (oldFeedItemIds, orphanedFeedItemIds) => new Set([...oldFeedItemIds, ...orphanedFeedItemIds])
)

export { selectByTabId, selectIdsByTabId, selectOldAndOrphanedFeedItemIds, selectOldFeedItemIds }
export default feedItemsSelectors
