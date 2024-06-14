import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import editFeedEffect from './effects/editFeedEffect'
import periodicFetchEffect from './effects/periodicFetchEffect'
import persistFeedItemsEffect from './effects/persistFeedItemsEffect'
import refreshFeedEffect from './effects/refreshFeedEffect'
import restoreFeedItemsEffect from './effects/restoreFeedItemsEffect'

const feedListenerMiddleware = createListenerMiddleware()
const startListening = feedListenerMiddleware.startListening as AppStartListening

const effects = [
  editFeedEffect,
  periodicFetchEffect,
  persistFeedItemsEffect,
  refreshFeedEffect,
  restoreFeedItemsEffect,
]

for (const effect of effects) {
  effect(startListening)
}

export default feedListenerMiddleware
