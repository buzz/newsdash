import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import persistLayoutEffect from './effects/persistLayoutEffect'
import rcLayoutChangeEffect from './effects/rcLayoutChangeEffect'
import removeTabsOnCascadeEffect from './effects/removePanelEffect'
import requestNewTabEffect from './effects/requestNewTabEffect'
import setActiveTabEffect from './effects/setActiveTabEffect'

const layoutListenerMiddleware = createListenerMiddleware()
const startListening = layoutListenerMiddleware.startListening as AppStartListening

const effects = [
  persistLayoutEffect,
  rcLayoutChangeEffect,
  removeTabsOnCascadeEffect,
  requestNewTabEffect,
  setActiveTabEffect,
]

for (const effect of effects) {
  effect(startListening)
}

export default layoutListenerMiddleware
