import fetchFeed from '#store/middlewares/feedListenerMiddleware/utils'
import { layoutRestored } from '#store/slices/layout/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import selectSettings from '#store/slices/settings/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const CHECK_INTERVAL = 10_000

/** Periodically fetch feed. */
function periodicFetchEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: layoutRestored,
    effect: async (action, listenerApi) => {
      while (true) {
        const state = listenerApi.getState()
        const { fetchInterval } = selectSettings(state)

        const now = Date.now()
        const intervalMillis = fetchInterval * 60 * 1000

        await Promise.all(
          tabsSelectors
            .selectAll(state)
            .filter((tab) => tab.editMode === undefined && now - tab.lastFetched > intervalMillis)
            .map((tab) => fetchFeed(listenerApi, tab))
        )

        await listenerApi.delay(CHECK_INTERVAL)
      }
    },
  })
}

export default periodicFetchEffect
