import { addAppListener } from '#store/middleware/utils'
import { addFetchedFeedItems, removeFeedItems } from '#store/slices/feedItems/actions'
import { selectOldFeedItemIds } from '#store/slices/feedItems/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

/** Remove old feed items. */
function removeOldFeedItemsEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: addFetchedFeedItems,
      effect: ({ payload: { tabId } }, listenerApi) => {
        const feedItemIds = selectOldFeedItemIds(listenerApi.getState(), tabId)
        if (feedItemIds.size > 0) {
          listenerApi.dispatch(removeFeedItems([...feedItemIds]))
        }
      },
    })
  )
}

export default removeOldFeedItemsEffect
