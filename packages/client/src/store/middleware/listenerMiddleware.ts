import { createListenerMiddleware } from '@reduxjs/toolkit'

import { init as initAction } from '#store/slices/app/actions'
import type { AppDispatch, RootState } from '#store/types'

import init from './init'

const listenerMiddleware = createListenerMiddleware()

const startAppListening = listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()

startAppListening({
  actionCreator: initAction,
  effect: async (action, listenerApi) => {
    listenerApi.unsubscribe()
    await init(listenerApi)
  },
})

export default listenerMiddleware
