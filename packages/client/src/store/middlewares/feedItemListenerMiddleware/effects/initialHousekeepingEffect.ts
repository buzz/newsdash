import { addFeedItems, removeFeedItems } from '#store/slices/feedItems/actions'
import { selectOldFeedItemIds, selectOrphanedFeedItemIds } from '#store/slices/feedItems/selectors'
import type { AppStartListening } from '#store/middlewares/types'

/** Remove old and orphaned items */
function initialHousekeepingEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: addFeedItems,
    effect: (action, listenerApi) => {
      listenerApi.unsubscribe()

      const state = listenerApi.getState()
      const feedIds = [...selectOldFeedItemIds(state), ...selectOrphanedFeedItemIds(state)]

      if (feedIds.length > 0) {
        listenerApi.dispatch(removeFeedItems(feedIds))
      }
    },
  })
}

export default initialHousekeepingEffect
