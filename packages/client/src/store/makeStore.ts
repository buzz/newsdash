import { configureStore } from '@reduxjs/toolkit'

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
        connectivityCheckListenerMiddleware.middleware,
        layoutListenerMiddleware.middleware,
      ]),
    reducer,
  })
}

export default makeStore
