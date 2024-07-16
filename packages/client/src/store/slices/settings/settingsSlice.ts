import type { PayloadAction } from '@reduxjs/toolkit'

import createSlice from '#store/createSlice'
import { settingsSchema } from '#types/schema'
import type { Settings } from '#types/types'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: settingsSchema.parse({}),

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
