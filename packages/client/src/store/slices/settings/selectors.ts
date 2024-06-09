import type { RootState } from '#store/types'

/** Select settings slice */
const selectSettingsSlice = (state: RootState) => state.settings

export default selectSettingsSlice
