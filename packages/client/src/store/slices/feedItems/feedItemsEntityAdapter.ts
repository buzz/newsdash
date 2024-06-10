import { createEntityAdapter } from '@reduxjs/toolkit'

import type { FeedItem } from '#types/feed'

const feedItemsEntityAdapter = createEntityAdapter<FeedItem>()

const feedItemsInitialState = feedItemsEntityAdapter.getInitialState()

export { feedItemsInitialState }
export default feedItemsEntityAdapter
