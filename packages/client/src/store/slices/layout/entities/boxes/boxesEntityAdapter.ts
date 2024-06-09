import { createEntityAdapter } from '@reduxjs/toolkit'

import type { Box } from '@newsdash/schema'

import sortOrderComparer from '#store/utils/sortOrderComparer'

const boxesEntityAdapter = createEntityAdapter<Box>({ sortComparer: sortOrderComparer })

const boxesInitialState = boxesEntityAdapter.getInitialState()

export { boxesInitialState }
export default boxesEntityAdapter
