import type { EntityState } from '@reduxjs/toolkit'

import type { Box, Panel, Tab } from '@newsdash/common/schema'

import createSlice from '#store/createSlice'

import { restoreLayout, updateLayout } from './actions'
import { boxesInitialState } from './entities/boxes/boxesEntityAdapter'
import { panelsInitialState } from './entities/panels/panelsEntityAdapter'
import { tabsInitialState } from './entities/tabs/tabsEntityAdapter'
import { restoreLayoutReducer, updateLayoutReducer } from './extraReducers'

interface LayoutState {
  boxes: EntityState<Box, string>
  panels: EntityState<Panel, string>
  tabs: EntityState<Tab, string>
}

const initialState: LayoutState = {
  boxes: boxesInitialState,
  panels: panelsInitialState,
  tabs: tabsInitialState,
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateLayout, updateLayoutReducer)
    builder.addCase(restoreLayout, restoreLayoutReducer)
  },
})

export type { LayoutState }
export default layoutSlice
