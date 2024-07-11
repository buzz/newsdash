import type { CSSProperties } from 'react'

import type { GridData, ListData } from './types'

function gridItemKey({ columnIndex, data: { columnCount, items }, rowIndex }: GridItemKeyArg) {
  try {
    return items[rowIndex * columnCount + columnIndex].id
  } catch {
    return `dummy${columnIndex}${rowIndex}`
  }
}

function listItemKey(index: number, { items }: ListData) {
  return items[index].id
}

function parseHeight(height: CSSProperties['height']): number {
  return (typeof height === 'string' ? Number.parseFloat(height) : height) ?? 0
}

interface GridItemKeyArg {
  columnIndex: number
  data: GridData
  rowIndex: number
}

export { gridItemKey, listItemKey, parseHeight }
