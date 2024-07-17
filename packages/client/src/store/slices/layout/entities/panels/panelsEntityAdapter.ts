import { createEntityAdapter } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

import type { Panel } from '@newsdash/common/schema'

import { DOCKBOX_ID, TAB_GROUP } from '#constants'
import { orderSortComparer } from '#store/sortComparer'

const panelsEntityAdapter = createEntityAdapter<Panel>({
  sortComparer: orderSortComparer,
})

const panelsInitialState = panelsEntityAdapter.getInitialState(undefined, [
  {
    id: nanoid(),
    group: TAB_GROUP,
    order: 0,
    parentId: DOCKBOX_ID,
  },
])

export { panelsInitialState }
export default panelsEntityAdapter
