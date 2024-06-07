import { createSelector } from '@reduxjs/toolkit'

import LayoutDenormalizer from '#store/utils/LayoutDenormalizer'
import type { RootState } from '#store/types'

/** Select denormalized layout */
export const selectDenormalizedLayout = createSelector([(state: RootState) => state], (state) =>
  new LayoutDenormalizer(state).denormalizeLayout()
)
