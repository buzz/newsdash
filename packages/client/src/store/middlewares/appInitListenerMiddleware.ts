import { createListenerMiddleware } from '@reduxjs/toolkit'

import layoutApi from '#store/slices/api/layoutApi'
import settingsApi from '#store/slices/api/settingsApi'
import { init } from '#store/slices/app/actions'
import { restoreLayout } from '#store/slices/layout/actions'
import { updateSettings } from '#store/slices/settings/actions'
import type { AppStartListening } from '#store/middlewares/types'

const appInitListenerMiddleware = createListenerMiddleware()
const startListening = appInitListenerMiddleware.startListening as AppStartListening

/** Restore settings from server */
function restoreSettingsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
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

      listenerApi.unsubscribe()
    },
  })
}

/** Restore layout from server */
function restoreLayoutEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      const getLayout = layoutApi.endpoints.getLayout.initiate()
      const { isSuccess, data: layout } = await listenerApi.dispatch(getLayout)

      if (
        isSuccess &&
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

restoreSettingsEffect(startListening)
restoreLayoutEffect(startListening)

export default appInitListenerMiddleware
