import settingsApi from '#store/slices/api/settingsApi'
import { init } from '#store/slices/app/actions'
import { updateSettings } from '#store/slices/settings/actions'
import type { AppStartListening } from '#store/middlewares/types'

/** Restore settings from server */
function restoreSettingsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      try {
        const getSettings = settingsApi.endpoints.getSettings.initiate()
        const { isSuccess, data: settings } = await listenerApi.dispatch(getSettings)

        // TODO: handle error
        // listenerApi.dispatch(
        //   showNotification({
        //     autoClose: false,
        //     color: 'red',
        //     icon: 'connection-error',
        //     message: 'The backend server is not reachable.',
        //     title: 'No connection!',
        //     withCloseButton: false,
        //   })
        // )

        if (isSuccess) {
          listenerApi.dispatch(updateSettings(settings))
        }
      } finally {
        listenerApi.unsubscribe()
      }
    },
  })
}

export default restoreSettingsEffect
