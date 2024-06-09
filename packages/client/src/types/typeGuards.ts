import type { MantineColorScheme } from '@mantine/core'
import type { BoxData, PanelData } from 'rc-dock'

import type { ArbitraryObject } from './types'

function isArbitraryObject(obj: unknown): obj is ArbitraryObject {
  return typeof obj === 'object' && obj !== null
}

function isColorScheme(mode: unknown): mode is MantineColorScheme {
  return typeof mode === 'string' && ['light', 'dark', 'auto'].includes(mode)
}

function isBoxData(obj: unknown): obj is BoxData {
  return isArbitraryObject(obj) && Array.isArray(obj.children)
}

function isPanelData(obj: unknown): obj is PanelData {
  return isArbitraryObject(obj) && Array.isArray(obj.tabs)
}

export { isArbitraryObject, isBoxData, isColorScheme, isPanelData }
