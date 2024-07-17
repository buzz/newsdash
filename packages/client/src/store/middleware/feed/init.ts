import type { AppListenerEffectAPI } from '#store/middleware/types'

import editFeedEffect from './editFeedEffect'
import periodicFetch from './periodicFetch'
import refreshAllFeedsEffect from './refreshAllFeedsEffect'
import refreshFeedEffect from './refreshFeedEffect'
import removeTabEffect from './removeTabEffect'

function init(listenerApi: AppListenerEffectAPI) {
  editFeedEffect(listenerApi)
  refreshAllFeedsEffect(listenerApi)
  refreshFeedEffect(listenerApi)
  removeTabEffect(listenerApi)

  listenerApi.fork(() => periodicFetch(listenerApi))
}

export default init
