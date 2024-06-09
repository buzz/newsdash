import createSlice from '#store/createSlice'

import { addPanel, removePanel, updatePanel } from './actions'
import panelsEntityAdapter, { panelsInitialState } from './panelsEntityAdapter'

const panelsSlice = createSlice({
  name: 'panels',
  initialState: panelsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add panel
    builder.addCase(addPanel, (state, { payload: panel }) => {
      panelsEntityAdapter.upsertOne(state, panel)
    })

    // Remove panel
    builder.addCase(removePanel, (state, { payload: panelId }) => {
      panelsEntityAdapter.removeOne(state, panelId)
    })

    // Update panel
    builder.addCase(updatePanel, (state, { payload: update }) => {
      panelsEntityAdapter.updateOne(state, update)
    })
  },
})

export default panelsSlice
