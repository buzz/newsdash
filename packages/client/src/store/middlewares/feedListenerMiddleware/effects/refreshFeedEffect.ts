import fetchTab from '#store/middlewares/feedListenerMiddleware/utils'
import { refreshTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'

/** Force refresh. */
function refreshFeedEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: refreshTab,
    effect: async ({ payload: tabId }, listenerApi) => {
      const tab = tabsSelectors.selectById(listenerApi.getState(), tabId)
      await fetchTab(listenerApi, tab)
    },
  })
}

export default refreshFeedEffect
