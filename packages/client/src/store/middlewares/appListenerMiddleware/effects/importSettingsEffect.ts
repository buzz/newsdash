import { isError } from 'lodash-es'

import { persistLayoutSchema } from '@newsdash/common/schema'

import { fromPersistLayout } from '#store/middlewares/utils'
import { importSettings } from '#store/slices/app/actions'
import { restoreLayout } from '#store/slices/layout/actions'
import { showNotification } from '#store/slices/notifications/actions'
import { restoreSettings } from '#store/slices/settings/actions'
import { settingsSchema } from '#types/schema'
import { isArbitraryObject } from '#types/typeGuards'
import type { AppStartListening } from '#store/middlewares/types'

function isExport(thing: unknown): thing is Export {
  return (
    isArbitraryObject(thing) && Object.hasOwn(thing, 'layout') && Object.hasOwn(thing, 'settings')
  )
}

/** Import settings and layout from JSON backup */
function importSettingsEffect(startListening: AppStartListening) {
  startListening({
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
        let message: string | undefined

        if (isError(error)) {
          message = error.message
        }

        listenerApi.dispatch(
          showNotification({
            type: 'error',
            title: 'Failed to restore settings',
            message: `Could not parse: ${message ?? 'Unknown error'}`,
          })
        )
      }
    },
  })
}

interface Export {
  layout: Record<string, unknown>
  settings: Record<string, unknown>
}

export default importSettingsEffect
