import layoutApi from '#store/slices/api/layoutApi'
import settingsApi from '#store/slices/api/settingsApi'
import { rcLayoutReady, restoreLayout } from '#store/slices/layout/actions'
import { updateSettings } from '#store/slices/settings/actions'
import type { AppStartListening } from '#store/middlewares/types'

// TODO: Need to be done late?

/**
 * Handle rc-dock ready action.
 *
 * Initialize with server data or empty layout.
 */
function handleRcLayoutReadyEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: rcLayoutReady,
    effect: async (action, listenerApi) => {
      // Get settings
      const getSettings = settingsApi.endpoints.getSettings.initiate()
      const { isSuccess: isSuccessSettings, data: settings } =
        await listenerApi.dispatch(getSettings)

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

      if (isSuccessSettings) {
        listenerApi.dispatch(updateSettings(settings))
      }

      // Get layout
      const getLayout = layoutApi.endpoints.getLayout.initiate()
      const { isSuccess: isSuccessLayout, data: layout } = await listenerApi.dispatch(getLayout)

      if (
        isSuccessLayout &&
        layout.boxes.length > 0 &&
        layout.panels.length > 0 &&
        layout.tabs.length > 0
      ) {
        listenerApi.dispatch(
          restoreLayout({
            boxes: layout.boxes,
            panels: layout.panels,
            tabs: layout.tabs.map((tab) => ({ ...tab, status: 'loaded' })),
          })
        )
      }

      listenerApi.unsubscribe()
    },
  })
}

export default handleRcLayoutReadyEffect
