import { createEntityAdapter } from '@reduxjs/toolkit'

import sortOrderComparer from '#store/utils/sortOrderComparer'
import type { Panel } from '#types/layout'

const panelsEntityAdapter = createEntityAdapter<Panel>({
  sortComparer: sortOrderComparer,
})

export const panelsInitialState = panelsEntityAdapter.getInitialState()

export default panelsEntityAdapter
