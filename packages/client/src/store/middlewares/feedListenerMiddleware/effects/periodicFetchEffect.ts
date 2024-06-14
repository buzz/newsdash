import fetchTab from '#store/middlewares/feedListenerMiddleware/utils'
import { init } from '#store/slices/app/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import selectSettings from '#store/slices/settings/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const CHECK_INTERVAL = 10_000

/** Periodically fetch feed. */
function periodicFetchEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      while (true) {
        const state = listenerApi.getState()
        const { fetchInterval } = selectSettings(state)

        const now = Date.now()
        const fetchIntervalMs = fetchInterval * 60 * 1000

        await Promise.all(
          tabsSelectors
            .selectAll(state)
            .filter((tab) => tab.editMode === undefined && now - tab.lastFetched > fetchIntervalMs)
            .map((tab) => fetchTab(listenerApi, tab))
        )

        await listenerApi.delay(CHECK_INTERVAL)
      }
    },
  })
}

export default periodicFetchEffect
