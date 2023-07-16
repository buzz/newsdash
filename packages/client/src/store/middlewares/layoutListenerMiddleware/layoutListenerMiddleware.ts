import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import handleLayoutChangeEffect from './effects/handleLayoutChangeEffect'
import removeTabsOnCascadeEffect from './effects/handleRemovePanelEffect'
import handleSetActiveTabEffect from './effects/handleSetActiveTabEffect'
import initializeEffect from './effects/initializeEffect'
import requestNewTabEffect from './effects/requestNewTabEffect'

const layoutListenerMiddleware = createListenerMiddleware()
const startListening = layoutListenerMiddleware.startListening as AppStartListening

const effects = [
  initializeEffect,
  requestNewTabEffect,
  removeTabsOnCascadeEffect,
  handleSetActiveTabEffect,
  handleLayoutChangeEffect,
]

for (const effect of effects) {
  effect(startListening)
}

export default layoutListenerMiddleware
