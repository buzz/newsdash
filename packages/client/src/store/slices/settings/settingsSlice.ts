import type { PayloadAction } from '@reduxjs/toolkit'

import createSlice from '#store/createSlice'
import type { Settings } from '#types/types'

const initialState: Settings = {
  saturation: 50,
  lightness: 50,
  fetchInterval: 10,
  itemsToKeep: 100,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,

  reducers: {
    updateSettings: (state, { payload }: PayloadAction<Partial<Settings>>) => ({
      ...state,
      ...payload,
    }),
    restoreSettings: (state, { payload }: PayloadAction<Settings>) => payload,
  },
})

export const { reducer } = settingsSlice
export default settingsSlice
