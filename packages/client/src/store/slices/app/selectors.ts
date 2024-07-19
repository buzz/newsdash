import type { RootState } from '#store/types'

/** Select app slice */
const selectAppSlice = (state: RootState) => state.app

/** Select computed color scheme */
const selectColorScheme = (state: RootState) => selectAppSlice(state).colorScheme

/** Select header visible state */
const selectHeaderVisibile = (state: RootState) => selectAppSlice(state).headerVisible

/** Select init state */
const selectInitDone = (state: RootState) => selectAppSlice(state).initDone

/** Select modal */
const selectModal = (state: RootState) => selectAppSlice(state).modal

export { selectColorScheme, selectHeaderVisibile, selectInitDone, selectModal }
