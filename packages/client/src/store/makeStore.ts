import { configureStore } from '@reduxjs/toolkit'

import listenerMiddleware from './middleware/listenerMiddleware'
import reducer from './reducer'
import apiSlice from './slices/api/apiSlice'

/** Store factory */
function makeStore() {
  return configureStore({
    devTools: import.meta.env.DEV,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        // Add before serializability check middleware
        .prepend(listenerMiddleware.middleware)
        // eslint-disable-next-line unicorn/prefer-spread
        .concat(apiSlice.middleware),
    reducer,
  })
}

export default makeStore
