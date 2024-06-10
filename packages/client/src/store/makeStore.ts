// force import order to avoid circular import
import './slices/feedItems/actions'

import { configureStore } from '@reduxjs/toolkit'

import feedListenerMiddleware from './middlewares/feedListenerMiddleware/feedListenerMiddleware'
import layoutListenerMiddleware from './middlewares/layoutListenerMiddleware/layoutListenerMiddleware'
import reducer from './reducer'
import apiSlice from './slices/api/apiSlice'

/** Store factory */
function makeStore() {
  return configureStore({
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        // eslint-disable-next-line unicorn/prefer-spread
        .concat(
          apiSlice.middleware,
          feedListenerMiddleware.middleware,
          layoutListenerMiddleware.middleware
        ),
    reducer,
  })
}

export default makeStore
