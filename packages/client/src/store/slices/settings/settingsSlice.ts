import type { Settings } from '@newsdash/schema'

import createSlice from '#store/createSlice'

const initialState: Settings = {
  saturation: 50,
  lightness: 50,
  fetchInterval: 10,
  itemsToKeep: 100,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,

  reducers: {},
})

export const { reducer } = settingsSlice
export default settingsSlice
