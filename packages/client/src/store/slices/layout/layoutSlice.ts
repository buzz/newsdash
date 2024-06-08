import type { EntityState } from '@reduxjs/toolkit'

import createSlice from '#store/createSlice'
import type { Box, Panel, Tab } from '#types/layout'

import { updateLayout } from './actions'
import { boxesInitialState } from './entities/boxes/boxesEntityAdapter'
import { panelsInitialState } from './entities/panels/panelsEntityAdapter'
import { tabsInitialState } from './entities/tabs/tabsEntityAdapter'
import { updateLayoutReducer } from './extraReducers'

export interface LayoutState {
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
  },
})

export default layoutSlice
