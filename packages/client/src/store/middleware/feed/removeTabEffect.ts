import { addAppListener } from '#store/middleware/utils'
import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectByTabId } from '#store/slices/feedItems/selectors'
import { removeTab } from '#store/slices/layout/entities/tabs/actions'
import type { AppListenerEffectAPI } from '#store/middleware/types'

// Remove feed items when tab panel is removed.
function removeTabEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: removeTab,
      effect: ({ payload: tabId }, listenerApi) => {
        const ids = selectByTabId(listenerApi.getState(), tabId).map((item) => item.id)
        listenerApi.dispatch(removeFeedItems(ids))
      },
    })
  )
}

export default removeTabEffect
