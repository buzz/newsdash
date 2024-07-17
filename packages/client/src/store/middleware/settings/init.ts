import type { AppListenerEffectAPI } from '#store/middleware/types'

import importSettingsEffect from './importSettingsEffect'
import persistSettingsEffect from './persistSettingsEffect'

function init(listenerApi: AppListenerEffectAPI) {
  importSettingsEffect(listenerApi)
  persistSettingsEffect(listenerApi)
}

export default init
