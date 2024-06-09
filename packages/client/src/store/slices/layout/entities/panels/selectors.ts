import { createSelector } from '@reduxjs/toolkit'
import { placeHolderStyle as placeholderGroup } from 'rc-dock'

import type { RootState } from '#store/types'

import panelsEntityAdapter from './panelsEntityAdapter'

/** Adapter selectors */
const panelsSelectors = panelsEntityAdapter.getSelectors((state: RootState) => state.layout.panels)

/** Select all panels (excluding placeholder) */
const selectAllPanels = createSelector([panelsSelectors.selectAll], (panels) =>
  panels.filter((panel) => panel.group !== placeholderGroup)
)

/** Select child panels */
const selectChildPanels = (state: RootState, parentId: string) =>
  panelsSelectors.selectAll(state).filter((panel) => panel.parentId === parentId)

/** Select placeholder panel */
const selectPlaceholderPanel = (state: RootState) =>
  panelsSelectors.selectAll(state).find((panel) => panel.group === placeholderGroup)

/** Select panel for tab insertion */
const selectPanelForTab = (state: RootState) => selectAllPanels(state).at(0)

export { selectChildPanels, selectPanelForTab, selectPlaceholderPanel }
export default panelsSelectors
