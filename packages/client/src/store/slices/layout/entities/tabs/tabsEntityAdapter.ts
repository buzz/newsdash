import { createEntityAdapter } from '@reduxjs/toolkit'

import sortOrderComparer from '#store/utils/sortOrderComparer'
import type { NormalizedTab } from '#types/layout'

const tabsEntityAdapter = createEntityAdapter<NormalizedTab>({ sortComparer: sortOrderComparer })

export const tabsInitialState = tabsEntityAdapter.getInitialState()

export default tabsEntityAdapter
