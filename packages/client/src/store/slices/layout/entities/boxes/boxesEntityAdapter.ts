import { createEntityAdapter } from '@reduxjs/toolkit'

import sortOrderComparer from '#store/utils/sortOrderComparer'
import type { NormalizedBox } from '#types/layout'

const boxesEntityAdapter = createEntityAdapter<NormalizedBox>({ sortComparer: sortOrderComparer })

export const boxesInitialState = boxesEntityAdapter.getInitialState()

export default boxesEntityAdapter
