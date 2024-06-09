import type { MantineColorScheme } from '@mantine/core'

import type { CustomBoxData, CustomPanelData } from './layout'
import type { ArbitraryObject } from './types'

function isArbitraryObject(obj: unknown): obj is ArbitraryObject {
  return typeof obj === 'object' && obj !== null
}

function isColorScheme(mode: unknown): mode is MantineColorScheme {
  return typeof mode === 'string' && ['light', 'dark', 'auto'].includes(mode)
}

function isCustomBoxData(obj: unknown): obj is CustomBoxData {
  return isArbitraryObject(obj) && Array.isArray(obj.children)
}

function isCustomPanelData(obj: unknown): obj is CustomPanelData {
  return isArbitraryObject(obj) && Array.isArray(obj.tabs)
}

export { isArbitraryObject, isColorScheme, isCustomBoxData, isCustomPanelData }
