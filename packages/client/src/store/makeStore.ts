import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState, StateFromReducersMapObject } from '@reduxjs/toolkit'
import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import layoutSlice from './slices/layoutSlice'

const reducer = {
  [layoutSlice.name]: layoutSlice.reducer,
}

function middleware(getDefaultMiddleware: CurriedGetDefaultMiddleware<RootState>) {
  return getDefaultMiddleware()
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
