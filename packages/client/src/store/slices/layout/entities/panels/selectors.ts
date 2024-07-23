import { createSelector } from '@reduxjs/toolkit'
import { placeHolderStyle as placeholderGroup } from 'rc-dock'

import { idSortComparer } from '#store/sortComparer'
import type { RootState } from '#store/types'

import panelsEntityAdapter from './panelsEntityAdapter'

/** Adapter selectors */
const panelsSelectors = panelsEntityAdapter.getSelectors((state: RootState) => state.layout.panels)

/**
 * Select panels for persisting.
 *
 * Exclude `activeId` for less persists.
 */
const selectPersistPanels = createSelector([panelsSelectors.selectAll], (panels) =>
  panels
    .map((panel) => ({
      id: panel.id,
      group: panel.group,
      order: panel.order,
      parentId: panel.parentId,
      size: panel.size,
    }))
    .sort(idSortComparer)
)

/** Select child panels */
const selectChildPanels = (state: RootState, parentId: string) =>
  panelsSelectors.selectAll(state).filter((panel) => panel.parentId === parentId)

/** Select placeholder panel */
const selectPlaceholderPanel = (state: RootState) =>
  panelsSelectors.selectAll(state).find((panel) => panel.group === placeholderGroup)

/** Select panel for tab insertion */
const selectPanelForTab = (state: RootState) => panelsSelectors.selectAll(state).at(0)

const selectPanelByActiveTabId = (state: RootState, tabId: string) =>
  panelsSelectors.selectAll(state).find((panel) => panel.activeId === tabId)

export {
  selectChildPanels,
  selectPanelByActiveTabId,
  selectPanelForTab,
  selectPersistPanels,
  selectPlaceholderPanel,
}
export default panelsSelectors
