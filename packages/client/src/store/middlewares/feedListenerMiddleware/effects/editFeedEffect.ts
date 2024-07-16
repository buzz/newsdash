import fetchFeed from '#store/middlewares/feedListenerMiddleware/fetchFeed'
import { editTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'

/** Fetch feed after editing/creating. */
function editFeedEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: editTab,
    effect: async ({ payload: { id: tabId, changes } }, listenerApi) => {
      if (changes.status === 'loaded') {
        // Refetch only if URL changed
        if (!Object.keys(changes).includes('url')) {
          return
        }

        // TODO: check if url is different from before: then always fetch

        // Fetch feed
        const tab = tabsSelectors.selectById(listenerApi.getState(), tabId)
        await fetchFeed(listenerApi, tab)
      }
    },
  })
}

export default editFeedEffect
