import type { AppListenerEffectAPI } from '#store/middleware/types'

import editFeedEffect from './editFeedEffect'
import periodicFetchEffect from './periodicFetchEffect'
import refreshAllFeedsEffect from './refreshAllFeedsEffect'
import refreshFeedEffect from './refreshFeedEffect'
import removeTabEffect from './removeTabEffect'

function init(listenerApi: AppListenerEffectAPI) {
  editFeedEffect(listenerApi)
  periodicFetchEffect(listenerApi)
  refreshAllFeedsEffect(listenerApi)
  refreshFeedEffect(listenerApi)
  removeTabEffect(listenerApi)
}

export default init
