import type { PayloadAction } from '@reduxjs/toolkit'

import createSlice from '#store/createSlice'
import type { AppState, ModalName } from '#types/types'

const initialState: AppState = {
  headerVisible: false,
  modal: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,

  reducers: {
    changeHeaderVisibile(state, { payload }: PayloadAction<boolean>) {
      state.headerVisible = payload
    },

    openModal(state, { payload }: PayloadAction<ModalName>) {
      if (state.modal === null) {
        state.modal = payload
      }
    },

    closeModal(state) {
      state.modal = null
    },
  },
})

export const { reducer } = appSlice
export default appSlice
