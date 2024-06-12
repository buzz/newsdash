import { createEntityAdapter } from '@reduxjs/toolkit'

import type { Box } from '@newsdash/schema'

import { DOCKBOX_ID } from '#constants'
import { orderSortComparer } from '#store/utils/sortComparer'

const boxesEntityAdapter = createEntityAdapter<Box>({ sortComparer: orderSortComparer })

const boxesInitialState = boxesEntityAdapter.getInitialState(undefined, [
  {
    id: DOCKBOX_ID,
    mode: 'horizontal',
    order: 0,
    parentId: null,
  },
])

export { boxesInitialState }
export default boxesEntityAdapter
