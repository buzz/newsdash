import { createListenerMiddleware } from '@reduxjs/toolkit'

import { listenToEffects } from '#store/middlewares/utils'

import initialHousekeepingEffect from './effects/initialHousekeepingEffect'
import periodicRemoveFeedItemsEffect from './effects/periodicRemoveFeedItemsEffect'
import persistFeedItemsEffect from './effects/persistFeedItemsEffect'
import removeTabFeedItemsEffect from './effects/removeTabFeedItemsEffect'
import restoreFeedItemsEffect from './effects/restoreFeedItemsEffect'

const feedItemListenerMiddleware = createListenerMiddleware()

listenToEffects(feedItemListenerMiddleware, [
  initialHousekeepingEffect,
  periodicRemoveFeedItemsEffect,
  persistFeedItemsEffect,
  removeTabFeedItemsEffect,
  restoreFeedItemsEffect,
])

export default feedItemListenerMiddleware
