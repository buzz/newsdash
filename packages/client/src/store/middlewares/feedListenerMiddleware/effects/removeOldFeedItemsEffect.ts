import { init } from '#store/slices/app/actions'
import { removeFeedItems } from '#store/slices/feedItems/actions'
import { selectByTabId } from '#store/slices/feedItems/selectors'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import selectSettings from '#store/slices/settings/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const CHECK_INTERVAL = 12_000

/** Purge old feed items */
function removeOldFeedItemsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      while (true) {
        await listenerApi.delay(CHECK_INTERVAL)

        const state = listenerApi.getState()
        const { itemsToKeep } = selectSettings(state)

        const feedIds: string[] = []
        for (const { id: tabId } of tabsSelectors.selectAll(state)) {
          for (const [i, { id: feedId }] of selectByTabId(state, tabId).entries()) {
            if (i >= itemsToKeep) {
              feedIds.push(feedId)
            }
          }
        }

        if (feedIds.length > 0) {
          listenerApi.dispatch(removeFeedItems(feedIds))
        }
      }
    },
  })
}

export default removeOldFeedItemsEffect
