import { createEntityAdapter } from '@reduxjs/toolkit'

import type { Box } from '@newsdash/schema'

import { DOCKBOX_ID } from '#constants'
import sortOrderComparer from '#store/utils/sortOrderComparer'

const boxesEntityAdapter = createEntityAdapter<Box>({ sortComparer: sortOrderComparer })

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
