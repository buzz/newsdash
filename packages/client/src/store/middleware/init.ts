import { initDone } from '#store/slices/app/actions'
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
  await restoreSettings(listenerApi)
  await restoreLayout(listenerApi)
  await restoreFeedItems(listenerApi)

  // Init sub-modules
  feedInit(listenerApi)
  feedItemInit(listenerApi)
  layoutInit(listenerApi)
  settingsInit(listenerApi)

  listenerApi.dispatch(initDone())
}

export default init
