import { createEntityAdapter } from '@reduxjs/toolkit'

import sortOrderComparer from '#store/utils/sortOrderComparer'
import type { NormalizedPanel } from '#types/layout'

const panelsEntityAdapter = createEntityAdapter<NormalizedPanel>({
  sortComparer: sortOrderComparer,
})

export const panelsInitialState = panelsEntityAdapter.getInitialState()

export default panelsEntityAdapter
