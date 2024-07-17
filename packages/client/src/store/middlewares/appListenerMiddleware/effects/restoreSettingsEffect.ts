import { isError } from 'lodash-es'

import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'

import { restoreSettings as dbRestoreSettings } from '#store/middlewares/db'
import { init } from '#store/slices/app/actions'
import { showNotification } from '#store/slices/notifications/actions'
import { restoreSettings } from '#store/slices/settings/actions'
import type { AppStartListening } from '#store/middlewares/types'

/** Restore settings from IndexedDB */
function restoreSettingsEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      listenerApi.unsubscribe()

      try {
        const settings = await dbRestoreSettings()
        if (settings) {
          listenerApi.dispatch(restoreSettings(settings))
        }
      } catch (error) {
        listenerApi.dispatch(
          showNotification({
            type: 'error',
            title: 'Failed to restore settings',
            message: `IndexedDB error: ${isError(error) ? error.message : UNKNOWN_ERROR_MESSAGE}`,
          })
        )
      }
    },
  })
}

export default restoreSettingsEffect
