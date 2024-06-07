import { createEntityAdapter } from '@reduxjs/toolkit'

import sortOrderComparer from '#store/utils/sortOrderComparer'
import type { Tab } from '#types/layout'

const tabsEntityAdapter = createEntityAdapter<Tab>({ sortComparer: sortOrderComparer })

export const tabsInitialState = tabsEntityAdapter.getInitialState()

export default tabsEntityAdapter
