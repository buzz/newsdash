import { combineReducers } from '@reduxjs/toolkit'
import reduceReducers from 'reduce-reducers'

import boxesSlice from './entities/boxes/boxesSlice'
import panelsSlice from './entities/panels/panelsSlice'
import tabsSlice from './entities/tabs/tabsSlice'
import layoutSlice from './layoutSlice'

// Run layout reducer on whole layout slice, then sub-slice reducers on each
// sub-slice
const reducer = reduceReducers(
  layoutSlice.reducer,
  combineReducers({
    [boxesSlice.name]: boxesSlice.reducer,
    [panelsSlice.name]: panelsSlice.reducer,
    [tabsSlice.name]: tabsSlice.reducer,
  })
)

export default reducer
