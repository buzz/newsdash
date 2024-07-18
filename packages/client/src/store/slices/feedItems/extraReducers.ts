import type { CaseReducer, EntityState, Update } from '@reduxjs/toolkit'

import type { FeedItem } from '#types/feed'

import feedItemsEntityAdapter from './feedItemsEntityAdapter'
import type { addFeedItems, addFetchedFeedItems, removeFeedItems } from './actions'

/** Add feed items */
const addFeedItemsReducer: CaseReducer<
  EntityState<FeedItem, string>,
  ReturnType<typeof addFeedItems>
> = (state, { payload: items }) => {
  feedItemsEntityAdapter.upsertMany(state, items)
}

/** Add feed items from feed fetch (settings new=false on old items) */
const addFetchedFeedItemsReducer: CaseReducer<
  EntityState<FeedItem, string>,
  ReturnType<typeof addFetchedFeedItems>
> = (state, { payload: { items, oldItemIds: oldItemIdsArray, tabId } }) => {
  const oldItemIds = new Set(oldItemIdsArray)
  const updates: Update<FeedItem, string>[] = []
  const additions: FeedItem[] = []

  // Process new items
  for (const item of items) {
    // Update existing item
    if (oldItemIds.has(item.id)) {
      const { id, ...changes } = item
      updates.push({
        id,
        changes: { ...changes, new: false },
      })
      oldItemIds.delete(item.id)
    }
    // Add new item
    else {
      additions.push({ ...item, new: true, tabId })
    }
  }

  // Set new=false on remaining old items
  for (const id of oldItemIds) {
    updates.push({ id, changes: { new: false } })
  }

  feedItemsEntityAdapter.updateMany(state, updates)
  feedItemsEntityAdapter.upsertMany(state, additions)
}

/** Remove feed items */
const removeFeedItemsReducer: CaseReducer<
  EntityState<FeedItem, string>,
  ReturnType<typeof removeFeedItems>
> = (state, { payload: ids }) => {
  feedItemsEntityAdapter.removeMany(state, [...ids])
}

export { addFeedItemsReducer, addFetchedFeedItemsReducer, removeFeedItemsReducer }
