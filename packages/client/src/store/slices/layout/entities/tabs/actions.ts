import type { Update } from '@reduxjs/toolkit'

import { randomColor } from '#utils'
import type { CustomTab } from '#types/layout'

import tabsSlice from './tabsSlice'

/** Add new tab */
const addTab = tabsSlice.createAction('addTab', (tab: Omit<CustomTab, 'color'>) => ({
  payload: {
    color: randomColor(),
    editMode: 'create' as const,
    group: 'news',
    ...tab,
  },
}))

/** Remove tab */
const removeTab = tabsSlice.createAction<string>('removeTab')

/** Edit tab */
const editTab = tabsSlice.createAction<Update<CustomTab, string>>('editTab')

/** Refresh tab */
const refreshTab = tabsSlice.createAction<string>('refreshTab')

export { addTab, editTab, refreshTab, removeTab }
