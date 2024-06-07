import { createEntityAdapter } from '@reduxjs/toolkit'

import sortOrderComparer from '#store/utils/sortOrderComparer'
import type { Box } from '#types/layout'

const boxesEntityAdapter = createEntityAdapter<Box>({ sortComparer: sortOrderComparer })

export const boxesInitialState = boxesEntityAdapter.getInitialState()

export default boxesEntityAdapter
