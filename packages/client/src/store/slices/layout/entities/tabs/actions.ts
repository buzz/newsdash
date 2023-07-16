import type { NormalizedTab } from '#types/layout'

import tabsSlice from './tabsSlice'

/** Add new tab */
export const addTab = tabsSlice.createAction<NormalizedTab>('addTab')

/** Remove panel */
export const removeTab = tabsSlice.createAction<string>('removeTab')
