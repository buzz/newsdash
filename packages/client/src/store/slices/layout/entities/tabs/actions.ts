import type { Update } from '@reduxjs/toolkit'

import type { Tab } from '@newsdash/schema'

import { getRandomHue } from '#utils'

import tabsSlice from './tabsSlice'

/** Add new tab */
const addTab = tabsSlice.createAction('addTab', (tab: Omit<Tab, 'hue'>) => ({
  payload: {
    group: 'news',
    hue: getRandomHue(),
    ...tab,
  },
}))

/** Remove tab */
const removeTab = tabsSlice.createAction<string>('removeTab')

/** Edit tab */
const editTab = tabsSlice.createAction<Update<Tab, string>>('editTab')

/** Refresh tab */
const refreshTab = tabsSlice.createAction<string>('refreshTab')

export { addTab, editTab, refreshTab, removeTab }
