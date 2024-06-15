import createSlice from '#store/createSlice'

import { addFeedItems, addFetchedFeedItems, removeFeedItems } from './actions'
import {
  addFeedItemsReducer,
  addFetchedFeedItemsReducer,
  removeFeedItemsReducer,
} from './extraReducers'
import { feedItemsInitialState } from './feedItemsEntityAdapter'

export const feedItemsSlice = createSlice({
  name: 'feedItems',
  initialState: feedItemsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFeedItems, addFeedItemsReducer)
    builder.addCase(addFetchedFeedItems, addFetchedFeedItemsReducer)
    builder.addCase(removeFeedItems, removeFeedItemsReducer)
  },
})

export default feedItemsSlice
