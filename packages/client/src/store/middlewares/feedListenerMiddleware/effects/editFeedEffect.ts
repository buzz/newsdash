import fetchFeed from '#store/middlewares/feedListenerMiddleware/fetchFeed'
import { editTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import type { AppStartListening } from '#store/middlewares/types'

/** Fetch feed after editing/creating. */
function editFeedEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: editTab,
    effect: async ({ payload: { id: tabId, changes } }, listenerApi) => {
      if (['edit', 'new', 'loading'].includes(changes.status ?? '')) {
        return
      }

      if (changes.url) {
        const { url: urlOrig } = tabsSelectors.selectById(listenerApi.getOriginalState(), tabId)

        // Check if URL actually changed
        if (changes.url !== urlOrig) {
          // Fetch feed
          const tab = tabsSelectors.selectById(listenerApi.getState(), tabId)
          await fetchFeed(listenerApi, tab)
        }
      }
    },
  })
}

export default editFeedEffect
