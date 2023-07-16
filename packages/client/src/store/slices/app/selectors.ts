import type { RootState } from '#store/types'
import type { ModalName } from '#types/types'

/** Select app slice */
const selectAppSlice = (state: RootState) => state.app

/** Select header visible state */
export const selectHeaderVisibile = (state: RootState) => selectAppSlice(state).headerVisible

/** Select if modal is opened */
export const selectIsModalOpen = (state: RootState, name: ModalName) =>
  selectAppSlice(state).modalOpened === name
