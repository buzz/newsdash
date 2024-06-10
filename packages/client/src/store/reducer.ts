import { combineReducers } from '@reduxjs/toolkit'

import apiSlice from './slices/api/apiSlice'
import appSlice from './slices/app/appSlice'
import feedItemsSlice from './slices/feedItems/feedItemsSlice'
import layoutSlice from './slices/layout/layoutSlice'
import layoutReducer from './slices/layout/reducer'
import notificationsSlice from './slices/notifications/notificationsSlice'
import settingsSlice from './slices/settings/settingsSlice'

const reducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [appSlice.name]: appSlice.reducer,
  [feedItemsSlice.name]: feedItemsSlice.reducer,
  [layoutSlice.name]: layoutReducer,
  [notificationsSlice.name]: notificationsSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
})

export default reducer
