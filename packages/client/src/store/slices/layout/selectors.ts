import { createSelector } from '@reduxjs/toolkit'
import type { LayoutBase } from 'rc-dock'

import LayoutDenormalizer from '#store/utils/LayoutDenormalizer'
import LayoutNormalizer from '#store/utils/LayoutNormalizer'
import type { RootState } from '#store/types'

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
    (_, layout: LayoutBase) => layout,
    // Current IDs from store
    boxesSelectors.selectIds,
    panelsSelectors.selectIds,
    tabsSelectors.selectAll,
  ],
  (layout, boxIds, panelIds, tabs) =>
    new LayoutNormalizer(layout, boxIds, panelIds, tabs).normalizeLayout()
)

export { selectDenormalizedLayout, selectNormalizedLayout }
