import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import handleRcLayoutChangeEffect from './effects/handleRcLayoutChangeEffect'
import handleRcLayoutReadyEffect from './effects/handleRcLayoutReadyEffect'
import removeTabsOnCascadeEffect from './effects/handleRemovePanelEffect'
import handleSetActiveTabEffect from './effects/handleSetActiveTabEffect'
import persistLayoutEffect from './effects/persistLayoutEffect'
import requestNewTabEffect from './effects/requestNewTabEffect'

const layoutListenerMiddleware = createListenerMiddleware()
const startListening = layoutListenerMiddleware.startListening as AppStartListening

const effects = [
  requestNewTabEffect,
  removeTabsOnCascadeEffect,
  handleSetActiveTabEffect,
  handleRcLayoutChangeEffect,
  handleRcLayoutReadyEffect,
  persistLayoutEffect,
]

for (const effect of effects) {
  effect(startListening)
}

export default layoutListenerMiddleware
