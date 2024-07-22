import { addAppListener } from '#store/middleware/utils'
import { initDone } from '#store/slices/app/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import selectSettings from '#store/slices/settings/selectors'
import { isTabEditMode } from '#types/typeGuards'
import type { AppListenerEffectAPI } from '#store/middleware/types'

import fetchFeed from './fetchFeed'

const CHECK_INTERVAL = 10_000

/** Periodically fetch feed. */
function periodicFetchEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: initDone,
      effect: async (action, listenerApi) => {
        while (true) {
          const state = listenerApi.getState()
          const { fetchInterval } = selectSettings(state)

          const now = Date.now()
          const intervalMillis = fetchInterval * 60 * 1000

          await Promise.all(
            tabsSelectors
              .selectAll(state)
              .filter((tab) => !isTabEditMode(tab.status) && now - tab.lastFetched > intervalMillis)
              .map((tab) => fetchFeed(listenerApi, tab))
          )

          await listenerApi.delay(CHECK_INTERVAL)
        }
      },
    })
  )
}

export default periodicFetchEffect
