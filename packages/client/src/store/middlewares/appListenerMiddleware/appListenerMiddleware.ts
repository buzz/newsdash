import { createListenerMiddleware } from '@reduxjs/toolkit'

import { listenToEffects } from '#store/middlewares/utils'

import importSettingsEffect from './effects/importSettingsEffect'
import persistSettingsEffect from './effects/persistSettingsEffect'
import restoreSettingsEffect from './effects/restoreSettingsEffect'

const appListenerMiddleware = createListenerMiddleware()

listenToEffects(appListenerMiddleware, [
  importSettingsEffect,
  persistSettingsEffect,
  restoreSettingsEffect,
])

export default appListenerMiddleware
