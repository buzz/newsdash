import type { RootState } from '#store/types'

import boxesEntityAdapter from './boxesEntityAdapter'

/** Adapter selectors */
const globalizedSelectors = boxesEntityAdapter.getSelectors(
  (state: RootState) => state.layout.boxes
)

/** Select child boxes */
export const selectChildBoxes = (state: RootState, parentId: string | null) =>
  globalizedSelectors.selectAll(state).filter((box) => box.parentId === parentId)

/** Select root box */
export const selectDockbox = (state: RootState) => selectChildBoxes(state, null).at(0)

export { globalizedSelectors as globalizedBoxesSelectors }
