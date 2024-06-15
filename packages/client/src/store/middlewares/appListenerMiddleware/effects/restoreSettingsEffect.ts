import { settingsSchema } from '@newsdash/schema'

import { LOCALSTORAGE_SETTINGS_KEY } from '#constants'
import { init } from '#store/slices/app/actions'
import { restoreSettings } from '#store/slices/settings/actions'
import type { AppStartListening } from '#store/middlewares/types'

/** Restore settings from localStorage */
function restoreSettingsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: (action, listenerApi) => {
      try {
        const serializedSettings = localStorage.getItem(LOCALSTORAGE_SETTINGS_KEY)
        if (serializedSettings) {
          const parsedSettings: unknown = JSON.parse(serializedSettings)
          const settings = settingsSchema.parse(parsedSettings)
          listenerApi.dispatch(restoreSettings(settings))
        }
      } finally {
        listenerApi.unsubscribe()
      }
    },
  })
}

export default restoreSettingsEffect
