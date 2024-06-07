import type { BoxData, PanelData } from 'rc-dock'

import type { Box } from './layout'
import type { ArbitraryObject, ColorSchemeMode } from './types'

/** Type guard for arbitrary object */
export function isArbitraryObject(obj: unknown): obj is ArbitraryObject {
  return typeof obj === 'object' && obj !== null
}

export function isColorSchemeMode(mode: unknown): mode is ColorSchemeMode {
  return typeof mode === 'string' && ['light', 'dark', 'system'].includes(mode)
}

export function isPanelData(obj: unknown): obj is PanelData {
  return isArbitraryObject(obj) && Array.isArray(obj.tabs)
}

export function isBoxData(obj: unknown): obj is BoxData {
  return isArbitraryObject(obj) && Array.isArray(obj.children)
}

export function isNormalizedBox(obj: unknown): obj is Box {
  return isArbitraryObject(obj) && typeof obj.mode === 'string'
}
