import type { PayloadAction } from '@reduxjs/toolkit'

import createSlice from '#store/createSlice'
import type { AppState, ModalName, VersionInfo } from '#types/types'

const initialState: AppState = {
  headerVisible: false,
  modalOpened: null,
  versionInfo: null,
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

    /** Change version info */
    changeVersionInfo(state, { payload }: PayloadAction<VersionInfo>) {
      state.versionInfo = payload
    },
  },
})

export const { reducer } = appSlice
export default appSlice
