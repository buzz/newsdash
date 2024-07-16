import { createListenerMiddleware } from '@reduxjs/toolkit'

import { listenToEffects } from '#store/middlewares/utils'

import editFeedEffect from './effects/editFeedEffect'
import periodicFetchEffect from './effects/periodicFetchEffect'
import persistFeedItemsEffect from './effects/persistFeedItemsEffect'
import refreshFeedEffect from './effects/refreshFeedEffect'
import removeOldFeedItemsEffect from './effects/removeOldFeedItemsEffect'
import removeTabEffect from './effects/removeTabEffect'
import restoreFeedItemsEffect from './effects/restoreFeedItemsEffect'

const feedListenerMiddleware = createListenerMiddleware()

listenToEffects(feedListenerMiddleware, [
  editFeedEffect,
  periodicFetchEffect,
  persistFeedItemsEffect,
  refreshFeedEffect,
  removeOldFeedItemsEffect,
  removeTabEffect,
  restoreFeedItemsEffect,
])

export default feedListenerMiddleware
