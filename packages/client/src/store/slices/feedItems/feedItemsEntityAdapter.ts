import { createEntityAdapter } from '@reduxjs/toolkit'

import { dateSortComparer } from '#store/sortComparer'
import type { FeedItem } from '#types/feed'

const feedItemsEntityAdapter = createEntityAdapter<FeedItem>({
  sortComparer: dateSortComparer,
})

const feedItemsInitialState = feedItemsEntityAdapter.getInitialState()

export { feedItemsInitialState }
export default feedItemsEntityAdapter
