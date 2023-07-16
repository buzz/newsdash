import apiSlice from './slices/apiSlice'
import appSlice from './slices/app/appSlice'
import layoutSlice from './slices/layout/layoutSlice'
import layoutReducer from './slices/layout/reducer'
import settingsSlice from './slices/settings/settingsSlice'

const reducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [appSlice.name]: appSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
  [layoutSlice.name]: layoutReducer,
}

export default reducer
