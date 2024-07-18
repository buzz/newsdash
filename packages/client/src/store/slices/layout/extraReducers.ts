import type { CaseReducer } from '@reduxjs/toolkit'

import boxesEntityAdapter from './entities/boxes/boxesEntityAdapter'
import panelsEntityAdapter from './entities/panels/panelsEntityAdapter'
import tabsEntityAdapter from './entities/tabs/tabsEntityAdapter'
import type { restoreLayout, updateLayout } from './actions'
import type { LayoutState } from './layoutSlice'

/** Handle update of normalized layout, also remove remaining entities */
const updateLayoutReducer: CaseReducer<LayoutState, ReturnType<typeof updateLayout>> = (
  state,
  { payload: { entities, removeIds } }
) => {
  boxesEntityAdapter.removeMany(state.boxes, [...removeIds.boxIds])
  panelsEntityAdapter.removeMany(state.panels, [...removeIds.panelIds])
  tabsEntityAdapter.removeMany(state.tabs, [...removeIds.tabIds])

  boxesEntityAdapter.upsertMany(state.boxes, entities.boxes)
  panelsEntityAdapter.upsertMany(state.panels, entities.panels)
  tabsEntityAdapter.upsertMany(state.tabs, entities.tabs)
}

/** Handle restore of normalized layout, wiping layout before insertion */
const restoreLayoutReducer: CaseReducer<LayoutState, ReturnType<typeof restoreLayout>> = (
  state,
  { payload: entities }
) => {
  boxesEntityAdapter.removeAll(state.boxes)
  panelsEntityAdapter.removeAll(state.panels)
  tabsEntityAdapter.removeAll(state.tabs)

  boxesEntityAdapter.upsertMany(state.boxes, entities.boxes)
  panelsEntityAdapter.upsertMany(state.panels, entities.panels)
  tabsEntityAdapter.upsertMany(state.tabs, entities.tabs)
}

export { restoreLayoutReducer, updateLayoutReducer }
