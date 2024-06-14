import type { RootState } from '#store/types'

/** Select settings slice */
const selectSettings = (state: RootState) => state.settings

export default selectSettings
