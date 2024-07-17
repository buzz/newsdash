import { saveSettings } from '#store/middlewares/db'
import { debounce } from '#store/middlewares/utils'
import { updateSettings } from '#store/slices/settings/actions'
import selectSettings from '#store/slices/settings/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const PERSIST_DELAY = 500

/** Persist settings to IndexedDB */
function persistSettingsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: updateSettings,
    effect: async (action, listenerApi) => {
      await debounce(listenerApi, PERSIST_DELAY)

      const settings = selectSettings(listenerApi.getState())
      await saveSettings(settings)
    },
  })
}

export default persistSettingsEffect
