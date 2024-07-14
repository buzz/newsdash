import { createSelector } from '@reduxjs/toolkit'

import { selectPersistLayout } from '#store/slices/api/selectors'
import type { RootState } from '#store/types'

/** Select settings slice */
const selectSettings = (state: RootState) => state.settings

/** Select settings and layout for export */
const selectSettingsExport = createSelector(
  [selectSettings, selectPersistLayout],
  (settings, layout) => JSON.stringify({ layout, settings })
)

export { selectSettingsExport }
export default selectSettings
