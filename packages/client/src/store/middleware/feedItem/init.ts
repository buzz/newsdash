import type { AppListenerEffectAPI } from '#store/middleware/types'

import persistFeedItemsEffect from './persistFeedItemsEffect'
import removeOldFeedItemsEffect from './removeOldFeedItemsEffect'
import removeOrphanedFeedItems from './removeOrphanedFeedItems'
import removeTabFeedItemsEffect from './removeTabFeedItemsEffect'

function init(listenerApi: AppListenerEffectAPI) {
  removeOrphanedFeedItems(listenerApi)

  persistFeedItemsEffect(listenerApi)
  removeOldFeedItemsEffect(listenerApi)
  removeTabFeedItemsEffect(listenerApi)
}

export default init
