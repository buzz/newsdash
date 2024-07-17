import { saveSettings } from '#store/middleware/db'
import { addAppListener, debounce } from '#store/middleware/utils'
import { updateSettings } from '#store/slices/settings/actions'
import selectSettings from '#store/slices/settings/selectors'
import type { AppListenerEffectAPI } from '#store/middleware/types'

const PERSIST_DELAY = 500

// Persist settings to IndexedDB.
function persistSettingsEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: updateSettings,
      effect: async (action, listenerApi) => {
        await debounce(listenerApi, PERSIST_DELAY)

        const settings = selectSettings(listenerApi.getState())
        await saveSettings(settings)
      },
    })
  )
}

export default persistSettingsEffect
