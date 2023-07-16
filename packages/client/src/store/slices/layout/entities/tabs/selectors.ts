import type { RootState } from '#store/types'

import tabsEntityAdapter from './tabsEntityAdapter'

/** Adapter selectors */
const globalizedSelectors = tabsEntityAdapter.getSelectors((state: RootState) => state.layout.tabs)

/** Select panel tabs */
export const selectChildTabs = (state: RootState, panelId: string) =>
  globalizedSelectors.selectAll(state).filter((t) => t.parentId === panelId)

/** Get max tab order for panel */
export const selectMaxTabOrder = (state: RootState, panelId: string) =>
  Math.max(...selectChildTabs(state, panelId).map((p) => p.order))

export { globalizedSelectors as globalizedTabsSelectors }
