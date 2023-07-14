import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState, StateFromReducersMapObject } from '@reduxjs/toolkit'
import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import initListenerMiddleware from './middlewares/initListenerMiddleware'
import apiSlice from './slices/apiSlice'
import appSlice from './slices/appSlice'
import layoutSlice from './slices/layoutSlice'
import settingsSlice from './slices/settingsSlice'

const reducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [appSlice.name]: appSlice.reducer,
  [layoutSlice.name]: layoutSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
}

function middleware(getDefaultMiddleware: CurriedGetDefaultMiddleware<RootState>) {
  return getDefaultMiddleware().concat([apiSlice.middleware, initListenerMiddleware.middleware])
}

/** Store factory */
function makeStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    devTools: import.meta.env.DEV,
    middleware,
    preloadedState,
    reducer,
  })
}

/** Store type */
export type Store = ReturnType<typeof makeStore>

/** Root state */
export type RootState = StateFromReducersMapObject<typeof reducer>

/** Dispatch type */
export type AppDispatch = Store['dispatch']

export default makeStore
