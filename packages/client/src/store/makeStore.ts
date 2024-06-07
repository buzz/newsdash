import { configureStore } from '@reduxjs/toolkit'

import colorThemeModeListenerMiddleware from './middlewares/colorThemeModeListenerMiddleware'
import connectivityCheckListenerMiddleware from './middlewares/connectivityCheckListenerMiddleware'
import layoutListenerMiddleware from './middlewares/layoutListenerMiddleware/layoutListenerMiddleware'
import reducer from './reducer'
import apiSlice from './slices/apiSlice'

/** Store factory */
function makeStore() {
  return configureStore({
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
      // eslint-disable-next-line unicorn/prefer-spread
      getDefaultMiddleware().concat([
        apiSlice.middleware,
        colorThemeModeListenerMiddleware.middleware,
        connectivityCheckListenerMiddleware.middleware,
        layoutListenerMiddleware.middleware,
      ]),
    reducer,
  })
}

export default makeStore
