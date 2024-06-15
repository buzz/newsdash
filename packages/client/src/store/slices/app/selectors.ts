import type { RootState } from '#store/types'

/** Select app slice */
const selectAppSlice = (state: RootState) => state.app

/** Select header visible state */
const selectHeaderVisibile = (state: RootState) => selectAppSlice(state).headerVisible

/** Select modal */
const selectModal = (state: RootState) => selectAppSlice(state).modal

export { selectHeaderVisibile, selectModal }
