import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '#store/makeStore'
import type { AppState } from '#types/types'

const initialState: AppState = {
  headerVisible: false,
  settingsModalOpened: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,

  reducers: {
    /** Change header visible state */
    changeHeaderVisibile(state, { payload }: PayloadAction<boolean>) {
      state.headerVisible = payload
    },

    /** Change settings modal open state */
    changeSettingsModalOpened(state, { payload }: PayloadAction<boolean>) {
      state.settingsModalOpened = payload
    },
  },
})

/** Select app slice */
const selectAppSlice = (state: RootState) => state[appSlice.name]

/** Select header visible state */
export const selectHeaderVisibile = (state: RootState) => selectAppSlice(state).headerVisible

/** Select settings modal opened */
export const selectSettingsModalOpened = (state: RootState) =>
  selectAppSlice(state).settingsModalOpened

export const { changeHeaderVisibile, changeSettingsModalOpened } = appSlice.actions
export default appSlice
