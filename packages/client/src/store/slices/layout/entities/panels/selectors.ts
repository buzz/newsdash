import { createSelector } from '@reduxjs/toolkit'
import { placeHolderStyle as placeholderGroup } from 'rc-dock'

import type { RootState } from '#store/types'

import panelsEntityAdapter from './panelsEntityAdapter'

/** Adapter selectors */
const globalizedSelectors = panelsEntityAdapter.getSelectors(
  (state: RootState) => state.layout.panels
)

/** Select all panels (excluding placeholder) */
const selectAllPanels = createSelector([globalizedSelectors.selectAll], (panels) =>
  panels.filter((panel) => panel.group !== placeholderGroup)
)

/** Select child panels */
export const selectChildPanels = (state: RootState, parentId: string) =>
  globalizedSelectors.selectAll(state).filter((p) => p.parentId === parentId)

/** Select placeholder panel */
export const selectPlaceholderPanel = (state: RootState) =>
  globalizedSelectors.selectAll(state).find((p) => p.group === placeholderGroup)

/** Select panel for tab insertion */
export const selectPanelForTab = (state: RootState) => selectAllPanels(state).at(0)

export { globalizedSelectors as globalizedPanelsSelectors }
