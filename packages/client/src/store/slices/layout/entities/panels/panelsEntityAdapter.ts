import { createEntityAdapter } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import type { Panel } from '@newsdash/schema'

import { DOCKBOX_ID } from '#constants'
import { orderSortComparer } from '#store/utils/sortComparer'

const panelsEntityAdapter = createEntityAdapter<Panel>({
  sortComparer: orderSortComparer,
})

const panelsInitialState = panelsEntityAdapter.getInitialState(undefined, [
  {
    id: nanoid(),
    group: 'news',
    order: 0,
    parentId: DOCKBOX_ID,
  },
])

export { panelsInitialState }
export default panelsEntityAdapter
