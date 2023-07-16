import { notifications } from '@mantine/notifications'
import { createListenerMiddleware } from '@reduxjs/toolkit'

import { CONNECTIVITY_CHECK_INTERVAL } from '#constants'
import version from '#store/slices/api/version'
import { appInit, changeVersionInfo } from '#store/slices/app/actions'

import type { AppStartListening } from './types'

const initListenerMiddleware = createListenerMiddleware()
const startListening = initListenerMiddleware.startListening as AppStartListening

const NOTIFICATION_ID = 'connectivity'

// Connectivity check
startListening({
  actionCreator: appInit,
  effect: async (action, listenerApi) => {
    while (true) {
      const getVersionAction = version.endpoints.getVersion.initiate(undefined)
      const { isSuccess, data } = await listenerApi.dispatch(getVersionAction)

      if (isSuccess) {
        listenerApi.dispatch(changeVersionInfo(data))
        notifications.hide(NOTIFICATION_ID)
      } else {
        notifications.show({
          id: NOTIFICATION_ID,
          autoClose: false,
          color: 'red',
          message: 'The backend server is not reachable.',
          title: 'No connection!',
          withCloseButton: false,
        })
      }

      await listenerApi.delay(CONNECTIVITY_CHECK_INTERVAL)
    }
  },
})

export default initListenerMiddleware
