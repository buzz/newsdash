import { createListenerMiddleware } from '@reduxjs/toolkit'

import { listenToEffects } from '#store/middlewares/utils'

import closeOtherFeedSettingsEffect from './effects/closeOtherFeedSettingsEffect'
import customPanelColorEffect from './effects/customPanelColorEffect'
import persistLayoutEffect from './effects/persistLayoutEffect'
import rcLayoutChangeEffect from './effects/rcLayoutChangeEffect'
import removePanelEffect from './effects/removePanelEffect'
import removeTabEffect from './effects/removeTabEffect'
import requestNewTabEffect from './effects/requestNewTabEffect'
import restoreLayoutEffect from './effects/restoreLayoutEffect'

const layoutListenerMiddleware = createListenerMiddleware()

listenToEffects(layoutListenerMiddleware, [
  closeOtherFeedSettingsEffect,
  customPanelColorEffect,
  persistLayoutEffect,
  rcLayoutChangeEffect,
  removePanelEffect,
  removeTabEffect,
  requestNewTabEffect,
  restoreLayoutEffect,
])

export default layoutListenerMiddleware
