import type { RootState } from '#store/types'
import type { ModalName } from '#types/types'

/** Select app slice */
const selectAppSlice = (state: RootState) => state.app

/** Select header visible state */
const selectHeaderVisibile = (state: RootState) => selectAppSlice(state).headerVisible

/** Select if modal is opened */
const selectIsModalOpen = (state: RootState, name: ModalName) =>
  selectAppSlice(state).modalOpened === name

/** Select if loading initial state */
const selectIsLoadingInitialState = (state: RootState) =>
  selectAppSlice(state).isLoadingInitialState

export { selectHeaderVisibile, selectIsLoadingInitialState, selectIsModalOpen }
