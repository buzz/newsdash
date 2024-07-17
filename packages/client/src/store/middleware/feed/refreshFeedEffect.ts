import { addAppListener } from '#store/middleware/utils'
import { refreshTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

import fetchFeed from './fetchFeed'

// Force feed refresh.
function refreshFeedEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: refreshTab,
      effect: async ({ payload: tabId }, listenerApi) => {
        const tab = tabsSelectors.selectById(listenerApi.getState(), tabId)
        await fetchFeed(listenerApi, tab)
      },
    })
  )
}

export default refreshFeedEffect
