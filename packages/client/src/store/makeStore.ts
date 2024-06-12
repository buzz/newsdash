// force import order to avoid circular import
// https://redux-toolkit.js.org/usage/usage-guide#exporting-and-using-slices
import './slices/notifications/actions'

import { configureStore } from '@reduxjs/toolkit'

import appListenerMiddleware from './middlewares/appListenerMiddleware/appListenerMiddleware'
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
          appListenerMiddleware.middleware,
          feedListenerMiddleware.middleware,
          layoutListenerMiddleware.middleware
        ),
    reducer,
  })
}

export default makeStore
