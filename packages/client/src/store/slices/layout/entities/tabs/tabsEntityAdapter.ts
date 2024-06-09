import { createEntityAdapter } from '@reduxjs/toolkit'

import sortOrderComparer from '#store/utils/sortOrderComparer'
import type { CustomTab } from '#types/layout'

const tabsEntityAdapter = createEntityAdapter<CustomTab>({ sortComparer: sortOrderComparer })

const tabsInitialState = tabsEntityAdapter.getInitialState()

export { tabsInitialState }
export default tabsEntityAdapter
