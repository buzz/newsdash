import { addAppListener } from '#store/middleware/utils'
import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectByTabId } from '#store/slices/feedItems/selectors'
import { removeTab } from '#store/slices/layout/entities/tabs/actions'
import type { AppListenerEffectAPI } from '#store/middleware/types'

// Remove feed items when tab is removed.
function removeTabFeedItemsEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: removeTab,
      effect: ({ payload: tabId }, listenerApi) => {
        const feedIds = selectByTabId(listenerApi.getState(), tabId).map((item) => item.id)

        if (feedIds.length > 0) {
          listenerApi.dispatch(removeFeedItems(feedIds))
        }
      },
    })
  )
}

export default removeTabFeedItemsEffect
