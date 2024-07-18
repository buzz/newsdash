import { addAppListener } from '#store/middleware/utils'
import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectIdsByTabId } from '#store/slices/feedItems/selectors'
import { removeTab } from '#store/slices/layout/entities/tabs/actions'
import type { AppListenerEffectAPI } from '#store/middleware/types'

// Remove feed items when tab is removed.
function removeTabFeedItemsEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: removeTab,
      effect: ({ payload: tabId }, listenerApi) => {
        const feedIds = selectIdsByTabId(listenerApi.getState(), tabId)

        if (feedIds.size > 0) {
          listenerApi.dispatch(removeFeedItems([...feedIds]))
        }
      },
    })
  )
}

export default removeTabFeedItemsEffect
