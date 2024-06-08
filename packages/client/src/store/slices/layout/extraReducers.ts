import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

import type { NormalizedLayoutState } from '#store/utils/LayoutNormalizer'

import boxesEntityAdapter from './entities/boxes/boxesEntityAdapter'
import panelsEntityAdapter from './entities/panels/panelsEntityAdapter'
import tabsEntityAdapter from './entities/tabs/tabsEntityAdapter'
import type { LayoutState } from './layoutSlice'

/** Handle update of normalized layout, also remove remaining entities */
export const updateLayoutReducer: CaseReducer<LayoutState, PayloadAction<NormalizedLayoutState>> = (
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
