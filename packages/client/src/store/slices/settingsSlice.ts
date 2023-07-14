import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '#store/makeStore'
import type { ColorSchemeMode, Settings } from '#types/types'

const initialState: Settings = {
  colorSchemeMode: undefined,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,

  reducers: {
    /** Change color scheme mode */
    changeColorSchemeMode(state, { payload }: PayloadAction<ColorSchemeMode>) {
      state.colorSchemeMode = payload
    },
  },
})

/** Select settings slice */
const selectSettingsSlice = (state: RootState) => state[settingsSlice.name]

/** Select current color scheme mode */
export const selectColorSchemeMode = (state: RootState) =>
  selectSettingsSlice(state).colorSchemeMode

export const { changeColorSchemeMode } = settingsSlice.actions
export default settingsSlice
