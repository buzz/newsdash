import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

import type { NormalizedEntities } from '#types/types'

import boxesEntityAdapter from './entities/boxes/boxesEntityAdapter'
import panelsEntityAdapter from './entities/panels/panelsEntityAdapter'
import tabsEntityAdapter from './entities/tabs/tabsEntityAdapter'
import type { UpdateLayoutPayload } from './actions'
import type { LayoutState } from './layoutSlice'

/** Handle update of normalized layout, also remove remaining entities */
const updateLayoutReducer: CaseReducer<LayoutState, PayloadAction<UpdateLayoutPayload>> = (
  state,
  { payload: { entities, removeIds } }
) => {
  boxesEntityAdapter.removeMany(state.boxes, removeIds.boxIds)
  panelsEntityAdapter.removeMany(state.panels, removeIds.panelIds)
  tabsEntityAdapter.removeMany(state.tabs, removeIds.tabIds)

  boxesEntityAdapter.upsertMany(state.boxes, entities.boxes)
  panelsEntityAdapter.upsertMany(state.panels, entities.panels)
  tabsEntityAdapter.upsertMany(state.tabs, entities.tabs)
}

/** Handle restore of normalized layout, wiping layout before insertion */
const restoreLayoutReducer: CaseReducer<LayoutState, PayloadAction<NormalizedEntities>> = (
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
