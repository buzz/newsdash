import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '#store/makeStore'
import type { AppState, ModalName } from '#types/types'

const initialState: AppState = {
  headerVisible: false,
  modalOpened: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,

  reducers: {
    /** Change header visible state */
    changeHeaderVisibile(state, { payload }: PayloadAction<boolean>) {
      state.headerVisible = payload
    },

    /** Open modal */
    openModal(state, { payload }: PayloadAction<ModalName>) {
      if (state.modalOpened === null) {
        state.modalOpened = payload
      }
    },

    /** Close modal */
    closeModal(state, { payload }: PayloadAction<ModalName>) {
      if (state.modalOpened === payload) {
        state.modalOpened = null
      }
    },
  },
})

/** Select app slice */
const selectAppSlice = (state: RootState) => state[appSlice.name]

/** Select header visible state */
export const selectHeaderVisibile = (state: RootState) => selectAppSlice(state).headerVisible

/** Select if modal is opened */
export const selectIsModalOpen = (state: RootState, name: ModalName) =>
  selectAppSlice(state).modalOpened === name

export const { changeHeaderVisibile, closeModal, openModal } = appSlice.actions
export default appSlice
