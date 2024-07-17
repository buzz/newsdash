import { createSelector } from '@reduxjs/toolkit'

import type { Box } from '@newsdash/common/schema'

import { TAB_MIN_HEIGHT, TAB_MIN_WIDTH } from '#constants'
import { selectChildBoxes, selectDockbox } from '#store/slices/layout/entities/boxes/selectors'
import { selectChildPanels } from '#store/slices/layout/entities/panels/selectors'
import { selectChildTabs } from '#store/slices/layout/entities/tabs/selectors'
import { orderSortComparer } from '#store/sortComparer'
import type { RootState } from '#store/types'
import type { CustomBoxData } from '#types/layout'

const EMPTY_LAYOUT: { dockbox: CustomBoxData } = {
  dockbox: { mode: 'horizontal', children: [], order: 0 },
}

function denormalizeBox(state: RootState, box: Box): CustomBoxData {
  return {
    ...box,
    children: [
      ...selectChildBoxes(state, box.id).map((child) => denormalizeBox(state, child)),
      ...selectChildPanels(state, box.id).map((child) => ({
        ...child,
        tabs: selectChildTabs(state, child.id).map((tab) => ({
          ...tab,
          minHeight: TAB_MIN_HEIGHT,
          minWidth: TAB_MIN_WIDTH,
        })),
      })),
    ].sort(orderSortComparer),
  }
}

/** Select denormalized layout (transform layout to by rc-dock's nested structure) */
const selectDenormalizedLayout = createSelector(
  [(state: RootState) => state, selectDockbox],
  (state, dockbox) => (dockbox ? { dockbox: denormalizeBox(state, dockbox) } : EMPTY_LAYOUT)
)

export default selectDenormalizedLayout
