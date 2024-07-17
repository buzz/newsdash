import { addAppListener } from '#store/middleware/utils'
import { editTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

import fetchFeed from './fetchFeed'

// Fetch feed after editing/creating.
function editFeedEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
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
  )
}

export default editFeedEffect
