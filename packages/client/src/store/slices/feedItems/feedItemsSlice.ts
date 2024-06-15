import type { Update } from '@reduxjs/toolkit'

import createSlice from '#store/createSlice'
import type { FeedItem } from '#types/feed'

import { addFeedItems, addFetchedFeedItems } from './actions'
import feedItemsEntityAdapter, { feedItemsInitialState } from './feedItemsEntityAdapter'

export const feedItemsSlice = createSlice({
  name: 'feedItems',
  initialState: feedItemsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add feed items
    builder.addCase(addFeedItems, (state, { payload: items }) => {
      feedItemsEntityAdapter.upsertMany(state, items)
    })

    // Add feed items from feed fetch (settings new=false on old items)
    builder.addCase(addFetchedFeedItems, (state, { payload: { items, oldItemIds, tabId } }) => {
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
      feedItemsEntityAdapter.addMany(state, additions)
    })
  },
})

export default feedItemsSlice
