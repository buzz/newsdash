import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '#store/types'

import tabsEntityAdapter from './tabsEntityAdapter'

/** Adapter selectors */
const tabsSelectors = tabsEntityAdapter.getSelectors((state: RootState) => state.layout.tabs)

/**
 * Select tabs for persisting.
 *
 * Exclude tabs with `editMode` set to `create`. Only return fields to persist.
 */
const selectPersistTabs = createSelector([tabsSelectors.selectAll], (tabs) =>
  tabs
    .filter((tab) => tab.editMode !== 'create')
    .map((tab) => ({
      id: tab.id,
      description: tab.description,
      display: tab.display,
      group: tab.group,
      hue: tab.hue,
      link: tab.link,
      order: tab.order,
      parentId: tab.parentId,
      title: tab.title,
      url: tab.url,
    }))
)

/** Select panel tabs */
const selectChildTabs = (state: RootState, panelId: string) =>
  tabsSelectors.selectAll(state).filter((tab) => tab.parentId === panelId)

/** Get max tab order for panel */
const selectMaxTabOrder = (state: RootState, panelId: string) =>
  Math.max(...selectChildTabs(state, panelId).map((p) => p.order))

export { selectChildTabs, selectMaxTabOrder, selectPersistTabs }
export default tabsSelectors
