import createSlice from '#store/createSlice'

import { addFeedItems } from './actions'
import feedItemsEntityAdapter, { feedItemsInitialState } from './feedItemsEntityAdapter'

export const feedItemsSlice = createSlice({
  name: 'feedItems',
  initialState: feedItemsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add feed items
    builder.addCase(addFeedItems, (state, { payload: items }) => {
      // TODO: set new=false on all old feed items

      feedItemsEntityAdapter.upsertMany(state, items)
    })
  },
})

export default feedItemsSlice
