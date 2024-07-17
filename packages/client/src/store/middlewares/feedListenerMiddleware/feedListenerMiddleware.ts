import { createListenerMiddleware } from '@reduxjs/toolkit'

import { listenToEffects } from '#store/middlewares/utils'

import editFeedEffect from './effects/editFeedEffect'
import periodicFetchEffect from './effects/periodicFetchEffect'
import refreshFeedEffect from './effects/refreshFeedEffect'
import removeTabEffect from './effects/removeTabEffect'

const feedListenerMiddleware = createListenerMiddleware()

listenToEffects(feedListenerMiddleware, [
  editFeedEffect,
  periodicFetchEffect,
  refreshFeedEffect,
  removeTabEffect,
])

export default feedListenerMiddleware
