import { createSelector } from '@reduxjs/toolkit'

import type { RootState } from '#store/types'
import LayoutDenormalizer from '#store/utils/LayoutDenormalizer'

/** Select denormalized layout */
export const selectDenormalizedLayout = createSelector([(state: RootState) => state], (state) =>
  new LayoutDenormalizer(state).denormalizeLayout()
)
