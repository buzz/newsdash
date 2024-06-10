import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import fetchFeedEffect from './effects/fetchFeedEffect'

const feedListenerMiddleware = createListenerMiddleware()
const startListening = feedListenerMiddleware.startListening as AppStartListening

const effects = [fetchFeedEffect]

for (const effect of effects) {
  effect(startListening)
}

export default feedListenerMiddleware
