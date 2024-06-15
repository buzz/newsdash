import type { CaseReducer, EntityState, PayloadAction, Update } from '@reduxjs/toolkit'

import type { FeedItem } from '#types/feed'

import feedItemsEntityAdapter from './feedItemsEntityAdapter'
import type { AddFetchedFeedItemsPayload } from './actions'

/** Add feed items */
const addFeedItemsReducer: CaseReducer<EntityState<FeedItem, string>, PayloadAction<FeedItem[]>> = (
  state,
  { payload: items }
) => {
  feedItemsEntityAdapter.upsertMany(state, items)
}

/** Add feed items from feed fetch (settings new=false on old items) */
const addFetchedFeedItemsReducer: CaseReducer<
  EntityState<FeedItem, string>,
  PayloadAction<AddFetchedFeedItemsPayload>
> = (state, { payload: { items, oldItemIds, tabId } }) => {
  const oldIds = new Set(oldItemIds)
  const updates: Update<FeedItem, string>[] = []
  const additions: FeedItem[] = []

  // Process new items
  for (const item of items) {
    // Update existing item
    if (oldIds.has(item.id)) {
      const { id, ...changes } = item
      updates.push({
        id,
        changes: { ...changes, new: false },
      })
      oldIds.delete(item.id)
    }
    // Add new item
    else {
      additions.push({ ...item, new: true, tabId })
    }
  }

  // Set new=false on remaining old items
  for (const id of oldIds) {
    updates.push({ id, changes: { new: false } })
  }

  feedItemsEntityAdapter.updateMany(state, updates)
  feedItemsEntityAdapter.upsertMany(state, additions)
}

/** Remove feed items */
const removeFeedItemsReducer: CaseReducer<
  EntityState<FeedItem, string>,
  PayloadAction<string[]>
> = (state, { payload: ids }) => {
  feedItemsEntityAdapter.removeMany(state, ids)
}

export { addFeedItemsReducer, addFetchedFeedItemsReducer, removeFeedItemsReducer }
