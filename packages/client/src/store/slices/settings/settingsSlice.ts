import type { PayloadAction } from '@reduxjs/toolkit'

import {
  FETCH_INTERVAL_DEFAULT,
  ITEMS_TO_KEEP_DEFAULT,
  LIGHTNESS_DEFAULT,
  SATURATION_DEFAULT,
} from '#constants'
import createSlice from '#store/createSlice'
import type { Settings } from '#types/types'

const initialState: Settings = {
  tabColors: true,
  saturation: SATURATION_DEFAULT,
  lightness: LIGHTNESS_DEFAULT,
  fetchInterval: FETCH_INTERVAL_DEFAULT,
  itemsToKeep: ITEMS_TO_KEEP_DEFAULT,
  dateHour12: undefined,
  dateLocale: undefined,
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
