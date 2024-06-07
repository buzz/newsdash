import type { ColorScheme } from '@mantine/styles'

import { LOCAL_STORAGE_COLOR_THEME_KEY } from '#constants'
import { isColorSchemeMode } from '#types/typeGuards'
import type { ColorSchemeMode } from '#types/types'

/** Get color scheme mode from local storage */
export function earlyColorSchemeMode(): ColorSchemeMode {
  try {
    const mode = localStorage.getItem(LOCAL_STORAGE_COLOR_THEME_KEY) ?? 'system'
    if (isColorSchemeMode(mode)) {
      return mode
    }
  } catch (error) {
    console.error(error)
  }
  return 'system'
}

/** Convert `ColorSchemeMode` to Mantine `ColorScheme` */
export function colorSchemeFromMode(mode: ColorSchemeMode): ColorScheme {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return mode
}
