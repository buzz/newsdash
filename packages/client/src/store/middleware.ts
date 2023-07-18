import type { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

import colorThemeModeListenerMiddleware from './middlewares/colorThemeModeListenerMiddleware'
import connectivityCheckListenerMiddleware from './middlewares/connectivityCheckListenerMiddleware'
import layoutListenerMiddleware from './middlewares/layoutListenerMiddleware/layoutListenerMiddleware'
import apiSlice from './slices/apiSlice'
import type { RootState } from './types'

function middleware(getDefaultMiddleware: CurriedGetDefaultMiddleware<RootState>) {
  return getDefaultMiddleware().concat([
    apiSlice.middleware,
    colorThemeModeListenerMiddleware.middleware,
    connectivityCheckListenerMiddleware.middleware,
    layoutListenerMiddleware.middleware,
  ])
}

export default middleware
