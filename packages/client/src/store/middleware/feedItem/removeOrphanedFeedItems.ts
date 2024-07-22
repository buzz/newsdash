import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectOrphanedFeedItemIds } from '#store/slices/feedItems/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

function removeOrphanedFeedItems(listenerApi: AppListenerEffectAPI) {
  const state = listenerApi.getState()
  const feedIds = selectOrphanedFeedItemIds(state)
  if (feedIds.size > 0) {
    listenerApi.dispatch(removeFeedItems([...feedIds]))
  }
}

export default removeOrphanedFeedItems
