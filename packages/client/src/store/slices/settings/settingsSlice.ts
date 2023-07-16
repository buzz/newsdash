import type { PayloadAction } from '@reduxjs/toolkit'

import createSlice from '#store/createSlice'
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

export const { reducer } = settingsSlice
export default settingsSlice
