import type { AppListenerEffectAPI } from '#store/middleware/types'

import cleanupFeedItems from './cleanupFeedItems'
import periodicRemoveFeedItems from './periodicRemoveFeedItems'
import persistFeedItemsEffect from './persistFeedItemsEffect'
import removeTabFeedItemsEffect from './removeTabFeedItemsEffect'

function init(listenerApi: AppListenerEffectAPI) {
  cleanupFeedItems(listenerApi)

  persistFeedItemsEffect(listenerApi)
  removeTabFeedItemsEffect(listenerApi)

  listenerApi.fork(() => periodicRemoveFeedItems(listenerApi))
}

export default init
