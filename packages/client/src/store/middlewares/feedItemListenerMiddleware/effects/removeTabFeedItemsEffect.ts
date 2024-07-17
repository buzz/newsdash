import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectByTabId } from '#store/slices/feedItems/selectors'
import { removeTab } from '#store/slices/layout/entities/tabs/actions'
import type { AppStartListening } from '#store/middlewares/types'

/** Remove feed items when tab is removed */
function removeTabFeedItemsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: removeTab,
    effect: ({ payload: tabId }, listenerApi) => {
      const feedIds = selectByTabId(listenerApi.getState(), tabId).map((item) => item.id)

      if (feedIds.length > 0) {
        listenerApi.dispatch(removeFeedItems(feedIds))
      }
    },
  })
}

export default removeTabFeedItemsEffect
