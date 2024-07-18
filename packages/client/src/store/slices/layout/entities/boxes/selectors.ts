import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '#store/types'

import boxesEntityAdapter from './boxesEntityAdapter'

/** Adapter selectors */
const boxesSelectors = boxesEntityAdapter.getSelectors((state: RootState) => state.layout.boxes)

/** Select child boxes */
const selectChildBoxes = createSelector(
  [boxesSelectors.selectAll, (_: RootState, parentId: string | null) => parentId],
  (boxes, parentId) => boxes.filter((box) => box.parentId === parentId)
)

/** Select root box */
const selectDockbox = createSelector(
  [(state: RootState) => selectChildBoxes(state, null)],
  (boxes) => boxes.at(0)
)

export { selectChildBoxes, selectDockbox }
export default boxesSelectors
