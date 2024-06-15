import type { FeedItem } from '#types/feed'

import feedItemsSlice from './feedItemsSlice'

/** Add feed items */
const addFeedItems = feedItemsSlice.createAction<FeedItem[]>('addFeedItems')

/** Add feed items from a feed fetch */
const addFetchedFeedItems = feedItemsSlice.createAction<{ items: FeedItem[]; tabId: string }>(
  'addFetchedFeedItems'
)

export { addFeedItems, addFetchedFeedItems }
