import { createListenerMiddleware } from '@reduxjs/toolkit'

import { CONNECTIVITY_CHECK_INTERVAL } from '#constants'
import version from '#store/slices/api/version'
import { appInit, changeVersionInfo } from '#store/slices/app/actions'
import { hideNotification, showNotification } from '#store/slices/notifications/actions'

import type { AppStartListening } from './types'

const initListenerMiddleware = createListenerMiddleware()
const startListening = initListenerMiddleware.startListening as AppStartListening

let notificationId: string

// Connectivity check
startListening({
  actionCreator: appInit,
  effect: async (action, listenerApi) => {
    while (true) {
      const getVersionAction = version.endpoints.getVersion.initiate(undefined, {
        forceRefetch: true,
      })
      const { isSuccess, data } = await listenerApi.dispatch(getVersionAction)

      if (isSuccess) {
        listenerApi.dispatch(changeVersionInfo(data))
        if (notificationId) {
          listenerApi.dispatch(hideNotification(notificationId))
          notificationId = undefined
          await listenerApi.delay(700)
          listenerApi.dispatch(showNotification('reconnect'))
        }
      } else {
        if (!notificationId) {
          const action = showNotification('disconnect')
          notificationId = action.payload.id
          listenerApi.dispatch(action)
        }
      }

      await listenerApi.delay(CONNECTIVITY_CHECK_INTERVAL)
    }
  },
})

export default initListenerMiddleware
