import type { Settings } from '@newsdash/schema'

import settingsSlice from './settingsSlice'

/** Update settings */
export const updateSettings = settingsSlice.createAction<Settings>('updateSettings')
