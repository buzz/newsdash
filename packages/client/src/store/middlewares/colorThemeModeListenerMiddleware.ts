import { createListenerMiddleware } from '@reduxjs/toolkit'

import { LOCAL_STORAGE_COLOR_THEME_KEY } from '#constants'
import { changeColorSchemeMode } from '#store/slices/settings/actions'

import type { AppStartListening } from './types'

const colorThemeModeListenerMiddleware = createListenerMiddleware()
const startListening = colorThemeModeListenerMiddleware.startListening as AppStartListening

// Store color theme mode in local storage
startListening({
  actionCreator: changeColorSchemeMode,
  effect: ({ payload: colorSchemeMode }) => {
    localStorage.setItem(LOCAL_STORAGE_COLOR_THEME_KEY, colorSchemeMode)
  },
})

export default colorThemeModeListenerMiddleware
