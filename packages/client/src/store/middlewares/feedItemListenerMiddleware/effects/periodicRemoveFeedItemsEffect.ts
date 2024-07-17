import { init } from '#store/slices/app/actions'
import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectOldFeedItemIds } from '#store/slices/feedItems/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const CHECK_INTERVAL = 300_000 // 5 min

/** Purge old feed items */
function periodicRemoveFeedItemsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      while (true) {
        await listenerApi.delay(CHECK_INTERVAL)

        const feedIds = selectOldFeedItemIds(listenerApi.getState())
        if (feedIds.length > 0) {
          listenerApi.dispatch(removeFeedItems(feedIds))
        }
      }
    },
  })
}

export default periodicRemoveFeedItemsEffect
