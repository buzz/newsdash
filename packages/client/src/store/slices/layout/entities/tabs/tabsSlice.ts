import createSlice from '#store/createSlice'

import { addTab, removeTab } from './actions'
import tabsEntityAdapter, { tabsInitialState } from './tabsEntityAdapter'

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState: tabsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add tab
    builder.addCase(addTab, (state, { payload: tab }) => {
      tabsEntityAdapter.upsertOne(state, tab)
    })

    // Remove tab
    builder.addCase(removeTab, (state, { payload: tabId }) => {
      tabsEntityAdapter.removeOne(state, tabId)
    })
  },
})

export default tabsSlice
