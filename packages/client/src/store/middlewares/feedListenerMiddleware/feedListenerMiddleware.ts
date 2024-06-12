import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import fetchFeedEffect from './effects/fetchFeedEffect'
import persistFeedItemsEffect from './effects/persistFeedItemsEffect'
import restoreFeedItemsEffect from './effects/restoreFeedItemsEffect'

const feedListenerMiddleware = createListenerMiddleware()
const startListening = feedListenerMiddleware.startListening as AppStartListening

const effects = [fetchFeedEffect, persistFeedItemsEffect, restoreFeedItemsEffect]

for (const effect of effects) {
  effect(startListening)
}

export default feedListenerMiddleware
