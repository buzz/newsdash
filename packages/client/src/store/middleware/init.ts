import type { AppListenerEffectAPI } from '#store/middleware/types'

import feedInit from './feed/init'
import feedItemInit from './feedItem/init'
import restoreFeedItems from './feedItem/restoreFeedItems'
import layoutInit from './layout/init'
import restoreLayout from './layout/restoreLayout'
import settingsInit from './settings/init'
import restoreSettings from './settings/restoreSettings'

async function init(listenerApi: AppListenerEffectAPI) {
  // Restore app state
  await Promise.all([
    restoreFeedItems(listenerApi),
    restoreLayout(listenerApi),
    restoreSettings(listenerApi),
  ])

  listenerApi.fork(() => {
    feedInit(listenerApi)
    feedItemInit(listenerApi)
    layoutInit(listenerApi)
    settingsInit(listenerApi)
  })
}

export default init
