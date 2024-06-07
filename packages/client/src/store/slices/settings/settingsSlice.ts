import createSlice from '#store/createSlice'
import type { Settings } from '#types/types'

const initialState: Settings = {}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,

  reducers: {},
})

export const { reducer } = settingsSlice
export default settingsSlice
