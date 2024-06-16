import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import customPanelColorEffect from './effects/customPanelColorEffect'
import persistLayoutEffect from './effects/persistLayoutEffect'
import rcLayoutChangeEffect from './effects/rcLayoutChangeEffect'
import removePanelEffect from './effects/removePanelEffect'
import removeTabEffect from './effects/removeTabEffect'
import requestNewTabEffect from './effects/requestNewTabEffect'
import restoreLayoutEffect from './effects/restoreLayoutEffect'

const layoutListenerMiddleware = createListenerMiddleware()
const startListening = layoutListenerMiddleware.startListening as AppStartListening

const effects = [
  customPanelColorEffect,
  persistLayoutEffect,
  rcLayoutChangeEffect,
  removePanelEffect,
  removeTabEffect,
  requestNewTabEffect,
  restoreLayoutEffect,
]

for (const effect of effects) {
  effect(startListening)
}

export default layoutListenerMiddleware
