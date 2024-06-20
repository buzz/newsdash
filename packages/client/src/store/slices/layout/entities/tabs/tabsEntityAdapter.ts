import { createEntityAdapter } from '@reduxjs/toolkit'

import type { Tab } from '@newsdash/schema'

import { orderSortComparer } from '#store/utils/sortComparer'

const tabsEntityAdapter = createEntityAdapter<Tab>({ sortComparer: orderSortComparer })

const tabsInitialState = tabsEntityAdapter.getInitialState()

export { tabsInitialState }
export default tabsEntityAdapter
