import type { ColorSchemeMode } from './types'

export function isColorSchemeMode(mode: unknown): mode is ColorSchemeMode {
  return typeof mode === 'string' && ['light', 'dark', 'system'].includes(mode)
}
