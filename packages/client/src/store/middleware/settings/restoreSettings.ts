import { isError } from 'lodash-es'

import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'

import { restoreSettings as dbRestoreSettings } from '#store/middleware/db'
import { showNotification } from '#store/slices/notifications/actions'
import { restoreSettings as restoreSettingsAction } from '#store/slices/settings/actions'
import type { AppListenerEffectAPI } from '#store/middleware/types'

/** Restore settings from IndexedDB */
async function restoreSettings(listenerApi: AppListenerEffectAPI) {
  try {
    const settings = await dbRestoreSettings()
    if (settings) {
      listenerApi.dispatch(restoreSettingsAction(settings))
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
}

export default restoreSettings
