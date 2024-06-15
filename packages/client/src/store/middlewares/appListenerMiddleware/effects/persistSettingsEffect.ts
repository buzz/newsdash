import { LOCALSTORAGE_SETTINGS_KEY } from '#constants'
import { debounce } from '#store/middlewares/utils'
import { updateSettings } from '#store/slices/settings/actions'
import selectSettings from '#store/slices/settings/selectors'
import type { AppStartListening } from '#store/middlewares/types'

const PERSIST_DELAY = 500

/** Persist settings to localStorage */
function persistSettingsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: updateSettings,
    effect: async (action, listenerApi) => {
      await debounce(listenerApi, PERSIST_DELAY)
      const state = listenerApi.getState()
      const settings = selectSettings(state)
      const serializedSettings = JSON.stringify(settings)
      localStorage.setItem(LOCALSTORAGE_SETTINGS_KEY, serializedSettings)
    },
  })
}

export default persistSettingsEffect
