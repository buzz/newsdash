import type { FeedItem } from '#types/feed'

import feedItemsSlice from './feedItemsSlice'

/** Add feed items */
const addFeedItems = feedItemsSlice.createAction<FeedItem[]>('addFeedItems')

/** Add feed items from a feed fetch */
const addFetchedFeedItems =
  feedItemsSlice.createAction<AddFetchedFeedItemsPayload>('addFetchedFeedItems')

/** Remove feed items */
const removeFeedItems = feedItemsSlice.createAction<string[]>('removeFeedItems')

interface AddFetchedFeedItemsPayload {
  items: Omit<FeedItem, 'new' | 'tabId'>[]
  oldItemIds: string[]
  tabId: string
}

export type { AddFetchedFeedItemsPayload }
export { addFeedItems, addFetchedFeedItems, removeFeedItems }
