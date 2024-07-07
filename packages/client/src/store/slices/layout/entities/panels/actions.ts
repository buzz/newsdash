import type { Update } from '@reduxjs/toolkit'

import type { Panel } from '@newsdash/common/schema'

import panelsSlice from './panelsSlice'

/** Add panel to layout */
const addPanel = panelsSlice.createAction<Panel>('addPanel')

/** Remove panel */
const removePanel = panelsSlice.createAction<string>('removePanel')

/** Update panel */
const updatePanel = panelsSlice.createAction<Update<Panel, string>>('updatePanel')

/** Set active tab */
const setActiveTab = panelsSlice.createAction<{ panelId: string; tabId: string }>('setActiveTab')

export { addPanel, removePanel, setActiveTab, updatePanel }
