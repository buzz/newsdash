import { createEntityAdapter } from '@reduxjs/toolkit'

import type { Tab } from '@newsdash/common/schema'

import { orderSortComparer } from '#store/sortComparer'

const tabsEntityAdapter = createEntityAdapter<Tab>({ sortComparer: orderSortComparer })

const tabsInitialState = tabsEntityAdapter.getInitialState()

export { tabsInitialState }
export default tabsEntityAdapter
