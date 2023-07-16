import { configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

import middleware from './middleware'
import reducer from './reducer'
import type { RootState } from './types'

/** Store factory */
function makeStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    devTools: import.meta.env.DEV,
    middleware,
    preloadedState,
    reducer,
  })
}

export default makeStore
