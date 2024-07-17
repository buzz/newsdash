import type { AppListenerEffectAPI } from '#store/middleware/types'

import closeOtherFeedSettingsEffect from './closeOtherFeedSettingsEffect'
import customPanelColorEffect, { updateStyleTag } from './customPanelColorEffect'
import persistLayoutEffect from './persistLayoutEffect'
import rcLayoutChangeEffect from './rcLayoutChangeEffect'
import removePanelEffect from './removePanelEffect'
import removeTabEffect from './removeTabEffect'
import requestNewTabEffect from './requestNewTabEffect'

function init(listenerApi: AppListenerEffectAPI) {
  updateStyleTag(listenerApi)

  closeOtherFeedSettingsEffect(listenerApi)
  customPanelColorEffect(listenerApi)
  persistLayoutEffect(listenerApi)
  rcLayoutChangeEffect(listenerApi)
  removePanelEffect(listenerApi)
  removeTabEffect(listenerApi)
  requestNewTabEffect(listenerApi)
}

export default init
