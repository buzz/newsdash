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
  [feedItemsSelectors.selectAll, (_, tabId: string) => tabId],
  (feedItems, tabId) => feedItems.filter((feedItem) => feedItem.tabId === tabId)
)

/** Select old feed item IDs. */
const selectOldFeedItemIds = createSelector(
  [selectSettings, tabsSelectors.selectAll, feedItemsSelectors.selectAll],
  ({ itemsToKeep }, tabs, feedItems) => {
    const feedIds: string[] = []

    for (const tab of tabs) {
      const tabItems = feedItems.filter((item) => item.tabId === tab.id)

      for (const [i, { id: feedId }] of tabItems.entries()) {
        if (i >= itemsToKeep) {
          feedIds.push(feedId)
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
    feedItems.filter((item) => !tabIds.includes(item.tabId)).map((item) => item.id)
)

export { selectByTabId, selectOldFeedItemIds, selectOrphanedFeedItemIds }
export default feedItemsSelectors
