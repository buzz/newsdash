import { createEntityAdapter } from '@reduxjs/toolkit'

import { orderSortComparer } from '#store/utils/sortComparer'
import type { CustomTab } from '#types/layout'

const tabsEntityAdapter = createEntityAdapter<CustomTab>({ sortComparer: orderSortComparer })

const tabsInitialState = tabsEntityAdapter.getInitialState()

export { tabsInitialState }
export default tabsEntityAdapter
