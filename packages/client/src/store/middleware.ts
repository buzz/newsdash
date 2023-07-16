import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import initListenerMiddleware from './middlewares/initListenerMiddleware'
import layoutListenerMiddleware from './middlewares/layoutListenerMiddleware/layoutListenerMiddleware'
import apiSlice from './slices/apiSlice'
import type { RootState } from './types'

function middleware(getDefaultMiddleware: CurriedGetDefaultMiddleware<RootState>) {
  return getDefaultMiddleware().concat([
    apiSlice.middleware,
    initListenerMiddleware.middleware,
    layoutListenerMiddleware.middleware,
  ])
}

export default middleware
