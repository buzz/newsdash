import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectOldFeedItemIds, selectOrphanedFeedItemIds } from '#store/slices/feedItems/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

function cleanupFeedItems(listenerApi: AppListenerEffectAPI) {
  const state = listenerApi.getState()
  const feedIds = new Set([...selectOldFeedItemIds(state), ...selectOrphanedFeedItemIds(state)])
  if (feedIds.size > 0) {
    listenerApi.dispatch(removeFeedItems([...feedIds]))
  }
}

export default cleanupFeedItems
