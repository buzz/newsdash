import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '#store/types'

import tabsEntityAdapter from './tabsEntityAdapter'

/** Adapter selectors */
const tabsSelectors = tabsEntityAdapter.getSelectors((state: RootState) => state.layout.tabs)

/** Select new/edit tabs. */
const selectEditTabs = createSelector([tabsSelectors.selectAll], (tabs) =>
  tabs.filter((tab) => ['edit', 'new'].includes(tab.status))
)

/** Select non-edit tabs. */
const selectNonEditTabs = createSelector([tabsSelectors.selectAll], (tabs) =>
  tabs.filter((tab) => !['edit', 'new'].includes(tab.status))
)

/**
 * Select tabs for persisting.
 *
 * Exclude tabs with `status` set to `new`. Only return fields to persist.
 */
const selectPersistTabs = createSelector([tabsSelectors.selectAll], (tabs) =>
  tabs
    .filter((tab) => tab.status !== 'new')
    .map((tab) => ({
      id: tab.id,
      customTitle: tab.customTitle,
      description: tab.description,
      display: tab.display,
      enablePopover: tab.enablePopover,
      gridView: tab.gridView,
      group: tab.group,
      hue: tab.hue,
      link: tab.link,
      maxColumnWidth: tab.maxColumnWidth,
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

export { selectChildTabs, selectEditTabs, selectMaxTabOrder, selectNonEditTabs, selectPersistTabs }
export default tabsSelectors
