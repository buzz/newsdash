import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import importSettingsEffect from './effects/importSettingsEffect'
import persistSettingsEffect from './effects/persistSettingsEffect'
import restoreSettingsEffect from './effects/restoreSettingsEffect'

const appListenerMiddleware = createListenerMiddleware()
const startListening = appListenerMiddleware.startListening as AppStartListening

const effects = [importSettingsEffect, persistSettingsEffect, restoreSettingsEffect]

for (const effect of effects) {
  effect(startListening)
}

export default appListenerMiddleware
