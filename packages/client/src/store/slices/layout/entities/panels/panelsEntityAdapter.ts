import { createEntityAdapter } from '@reduxjs/toolkit'

import type { Panel } from '@newsdash/schema'

import sortOrderComparer from '#store/utils/sortOrderComparer'

const panelsEntityAdapter = createEntityAdapter<Panel>({
  sortComparer: sortOrderComparer,
})

const panelsInitialState = panelsEntityAdapter.getInitialState()

export { panelsInitialState }
export default panelsEntityAdapter
