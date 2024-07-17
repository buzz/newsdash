import { addAppListener } from '#store/middleware/utils'
import { refreashAllTabs } from '#store/slices/layout/actions'
import { selectNonEditTabs } from '#store/slices/layout/entities/tabs/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

import fetchFeed from './fetchFeed'

// Force refresh for all feeds.
function refreshAllFeedsEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: refreashAllTabs,
      effect: async (action, listenerApi) => {
        const tabs = selectNonEditTabs(listenerApi.getState())
        await Promise.all(tabs.map((tab) => fetchFeed(listenerApi, tab)))
      },
    })
  )
}

export default refreshAllFeedsEffect
