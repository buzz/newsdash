import type { PayloadAction } from '@reduxjs/toolkit'

import createSlice from '#store/createSlice'
import type { AppState, ModalName } from '#types/types'

const initialState: AppState = {
  colorScheme: 'dark',
  headerVisible: false,
  modal: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,

  reducers: {
    changeColorScheme(state, { payload }: PayloadAction<AppState['colorScheme']>) {
      state.colorScheme = payload
    },

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
