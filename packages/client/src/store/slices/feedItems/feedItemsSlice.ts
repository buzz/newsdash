import createSlice from '#store/createSlice'

import { addFeedItems, addFetchedFeedItems } from './actions'
import feedItemsEntityAdapter, { feedItemsInitialState } from './feedItemsEntityAdapter'
import { selectByTabId } from './selectors'

export const feedItemsSlice = createSlice({
  name: 'feedItems',
  initialState: feedItemsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add feed items
    builder.addCase(addFeedItems, (state, { payload: items }) => {
      feedItemsEntityAdapter.upsertMany(state, items)
    })

    // Add feed items from feed fetch
    builder.addCase(addFetchedFeedItems, (state, { payload: { items, tabId } }) => {
      // TODO: set new=false on user focus?
      // Set new=false on old items
      const oldItems = selectByTabId(state, tabId)
      const updates = oldItems.map((item) => ({ id: item.id, changes: { new: false } }))
      feedItemsEntityAdapter.updateMany(state, updates)

      feedItemsEntityAdapter.upsertMany(state, items)
    })
  },
})

export default feedItemsSlice
