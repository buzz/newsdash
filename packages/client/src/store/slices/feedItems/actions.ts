import type { FeedItem } from '#types/feed'

import feedItemsSlice from './feedItemsSlice'

/** Add feed items */
const addFeedItems = feedItemsSlice.createAction<FeedItem[]>('addFeedItems')

export { addFeedItems }
