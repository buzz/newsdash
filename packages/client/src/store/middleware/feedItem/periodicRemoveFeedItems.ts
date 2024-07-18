import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectOldFeedItemIds } from '#store/slices/feedItems/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

const CHECK_INTERVAL = 300_000 // 5 min

/** Purge old feed items */
async function periodicRemoveFeedItems(listenerApi: AppListenerEffectAPI) {
  while (true) {
    await listenerApi.delay(CHECK_INTERVAL)

    const feedIds = selectOldFeedItemIds(listenerApi.getState())
    if (feedIds.size > 0) {
      listenerApi.dispatch(removeFeedItems([...feedIds]))
    }
  }
}

export default periodicRemoveFeedItems
