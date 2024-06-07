import type { Update } from '@reduxjs/toolkit'

import type { Tab } from '#types/layout'

import tabsSlice from './tabsSlice'

/** Add new tab */
export const addTab = tabsSlice.createAction('addTab', (tab: Omit<Tab, 'editMode'>) => ({
  payload: { ...tab, editMode: 'create' as const },
}))

/** Remove tab */
export const removeTab = tabsSlice.createAction<string>('removeTab')

/** Edit tab */
export const editTab = tabsSlice.createAction<Update<Tab>>('editTab')
