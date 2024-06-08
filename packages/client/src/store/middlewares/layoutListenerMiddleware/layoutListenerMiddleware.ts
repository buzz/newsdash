import { createListenerMiddleware } from '@reduxjs/toolkit'

import type { AppStartListening } from '#store/middlewares/types'

import handleRcLayoutChangeEffect from './effects/handleRcLayoutChangeEffect'
import removeTabsOnCascadeEffect from './effects/handleRemovePanelEffect'
import handleSetActiveTabEffect from './effects/handleSetActiveTabEffect'
import managePlaceholderEffect from './effects/managePlaceholderEffect'
import requestNewTabEffect from './effects/requestNewTabEffect'

const layoutListenerMiddleware = createListenerMiddleware()
const startListening = layoutListenerMiddleware.startListening as AppStartListening

const effects = [
  managePlaceholderEffect,
  requestNewTabEffect,
  removeTabsOnCascadeEffect,
  handleSetActiveTabEffect,
  handleRcLayoutChangeEffect,
]

for (const effect of effects) {
  effect(startListening)
}

export default layoutListenerMiddleware
