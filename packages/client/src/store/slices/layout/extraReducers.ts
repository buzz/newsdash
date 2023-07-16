import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

import type { NormalizedLayoutState } from '#store/utils/LayoutNormalizer'

import boxesEntityAdapter from './entities/boxes/boxesEntityAdapter'
import panelsEntityAdapter from './entities/panels/panelsEntityAdapter'
import tabsEntityAdapter from './entities/tabs/tabsEntityAdapter'
import type { LayoutState } from './layoutSlice'

/** Handle update of normalized layout, also remove remaining entities */
export const updateLayoutReducer: CaseReducer = (
  state: LayoutState,
  { payload: { entities, remainingIds } }: PayloadAction<NormalizedLayoutState>
) => {
  boxesEntityAdapter.removeMany(state.boxes, remainingIds.boxIds)
  panelsEntityAdapter.removeMany(state.panels, remainingIds.panelIds)
  tabsEntityAdapter.removeMany(state.tabs, remainingIds.tabIds)

  boxesEntityAdapter.upsertMany(state.boxes, entities.boxes)
  panelsEntityAdapter.upsertMany(state.panels, entities.panels)
  tabsEntityAdapter.upsertMany(state.tabs, entities.tabs)
}
