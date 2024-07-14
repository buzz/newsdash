import { LOCALSTORAGE_SETTINGS_KEY } from '#constants'
import { init } from '#store/slices/app/actions'
import { showNotification } from '#store/slices/notifications/actions'
import { restoreSettings } from '#store/slices/settings/actions'
import { settingsSchema } from '#types/schema'
import { zodErrorToString } from '#utils'
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
          const result = settingsSchema.safeParse(parsedSettings)
          if (result.success) {
            listenerApi.dispatch(restoreSettings(result.data))
          } else {
            console.error(result.error.format())
            listenerApi.dispatch(
              showNotification({
                type: 'error',
                title: 'Failed to restore settings',
                message: `Could not parse settings: ${zodErrorToString(result.error)}`,
              })
            )
          }
        }
      } finally {
        listenerApi.unsubscribe()
      }
    },
  })
}

export default restoreSettingsEffect
