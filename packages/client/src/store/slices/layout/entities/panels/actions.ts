import type { Update } from '@reduxjs/toolkit'

import type { Panel } from '#types/layout'

import panelsSlice from './panelsSlice'

/** Add panel to layout */
export const addPanel = panelsSlice.createAction<Panel>('addPanel')

/** Remove panel */
export const removePanel = panelsSlice.createAction<string>('removePanel')

/** Update panel */
export const updatePanel = panelsSlice.createAction<Update<Panel, string>>('updatePanel')

/** Set active tab */
export const setActiveTab = panelsSlice.createAction<{ panelId: string; tabId: string }>(
  'setActiveTab'
)
