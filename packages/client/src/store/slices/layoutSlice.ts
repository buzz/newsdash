import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { LayoutBase } from 'rc-dock'

import type { RootState } from '#store/makeStore'

const initialLayout: LayoutBase = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [{ id: 't1' }, { id: 't2' }],
      },
    ],
  },
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState: { layout: initialLayout },

  reducers: {
    /** Change current layout */
    changeLayout(state, action: PayloadAction<LayoutBase>) {
      console.log('changeLayout', action.payload)
      state.layout = action.payload
    },
  },
})

/** Select layout slice */
const selectLayoutSlice = (state: RootState) => state[layoutSlice.name]

/** Select current layout */
export const selectLayout = (state: RootState) => selectLayoutSlice(state).layout

export const { changeLayout } = layoutSlice.actions
export default layoutSlice
