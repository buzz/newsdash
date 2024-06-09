import { createSelector } from '@reduxjs/toolkit'

import LayoutDenormalizer from '#store/utils/LayoutDenormalizer'
import LayoutNormalizer from '#store/utils/LayoutNormalizer'
import type { RootState } from '#store/types'
import type { CustomLayoutBase } from '#types/layout'

import boxesSelectors from './entities/boxes/selectors'
import panelsSelectors from './entities/panels/selectors'
import tabsSelectors from './entities/tabs/selectors'

/** Select denormalized layout */
const selectDenormalizedLayout = createSelector([(state: RootState) => state], (state) =>
  new LayoutDenormalizer(state).denormalizeLayout()
)

/** Select denormalized layout */
const selectNormalizedLayout = createSelector(
  [
    (_, layout: CustomLayoutBase) => layout,
    // Current IDs from store
    boxesSelectors.selectIds,
    panelsSelectors.selectIds,
    tabsSelectors.selectIds,
  ],
  (layout, boxIds, panelIds, tabIds) =>
    new LayoutNormalizer(layout, boxIds, panelIds, tabIds).normalizeLayout()
)

export { selectDenormalizedLayout, selectNormalizedLayout }
