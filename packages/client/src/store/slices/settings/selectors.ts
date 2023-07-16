import type { RootState } from '#store/types'

/** Select settings slice */
const selectSettingsSlice = (state: RootState) => state.settings

/** Select current color scheme mode */
export const selectColorSchemeMode = (state: RootState) =>
  selectSettingsSlice(state).colorSchemeMode
