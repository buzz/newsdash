import apiSlice from './slices/apiSlice'
import appSlice from './slices/app/appSlice'
import layoutSlice from './slices/layout/layoutSlice'
import layoutReducer from './slices/layout/reducer'
import notificationsSlice from './slices/notifications/notificationsSlice'
import settingsSlice from './slices/settings/settingsSlice'

const reducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [appSlice.name]: appSlice.reducer,
  [layoutSlice.name]: layoutReducer,
  [notificationsSlice.name]: notificationsSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
}

export default reducer
