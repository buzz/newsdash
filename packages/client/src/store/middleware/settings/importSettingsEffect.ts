import { isError } from 'lodash-es'

import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'
import { persistLayoutSchema } from '@newsdash/common/schema'

import { addAppListener, fromPersistLayout } from '#store/middleware/utils'
import { importSettings } from '#store/slices/app/actions'
import { restoreLayout } from '#store/slices/layout/actions'
import { showNotification } from '#store/slices/notifications/actions'
import { restoreSettings } from '#store/slices/settings/actions'
import { settingsSchema } from '#types/schema'
import { isArbitraryObject } from '#types/typeGuards'
import type { AppListenerEffectAPI } from '#store/middleware/types'

function isExport(thing: unknown): thing is Export {
  return (
    isArbitraryObject(thing) && Object.hasOwn(thing, 'layout') && Object.hasOwn(thing, 'settings')
  )
}

// Import settings and layout from JSON backup.
function importSettingsEffect(listenerApi: AppListenerEffectAPI) {
  listenerApi.dispatch(
    addAppListener({
      actionCreator: importSettings,
      effect: ({ payload }, listenerApi) => {
        try {
          const parsedExport: unknown = JSON.parse(payload)

          if (!isExport(parsedExport)) {
            throw new Error('Invalid backup')
          }

          const parsedSettings = settingsSchema.safeParse(parsedExport.settings)
          if (!parsedSettings.success) {
            throw new Error('Invalid backup')
          }

          const parsedLayout = persistLayoutSchema.safeParse(parsedExport.layout)
          if (!parsedLayout.success) {
            throw new Error('Invalid backup')
          }

          listenerApi.dispatch(restoreSettings(parsedSettings.data))
          listenerApi.dispatch(restoreLayout(fromPersistLayout(parsedLayout.data)))

          listenerApi.dispatch(
            showNotification({
              type: 'success',
              title: 'Settings imported',
              message: 'Settings have been successfully restored from backup.',
            })
          )
        } catch (error) {
          listenerApi.dispatch(
            showNotification({
              type: 'error',
              title: 'Failed to restore settings',
              message: `Could not parse: ${isError(error) ? error.message : UNKNOWN_ERROR_MESSAGE}`,
            })
          )
        }
      },
    })
  )
}

interface Export {
  layout: Record<string, unknown>
  settings: Record<string, unknown>
}

export default importSettingsEffect
