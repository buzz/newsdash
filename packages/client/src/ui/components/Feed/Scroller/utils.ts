import type { CSSProperties } from 'react'
import type { GridOnScrollProps, ListOnScrollProps } from 'react-window'

import type { GridData, ListData, ScrollState } from './types'

const SCROLL_STATE_TOLERANCE = 2

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

function makeOnScroll<T extends 'grid' | 'list'>(
  windowType: T,
  height: number,
  rowHeight: number,
  rowCount: number,
  setScrollState: (value: ScrollState) => void
): (props: T extends 'grid' ? GridOnScrollProps : ListOnScrollProps) => void {
  const topThreshold = SCROLL_STATE_TOLERANCE
  const bottomThreshold = rowHeight * rowCount - SCROLL_STATE_TOLERANCE

  return (props) => {
    const offset =
      windowType === 'grid'
        ? (props as GridOnScrollProps).scrollTop
        : (props as ListOnScrollProps).scrollOffset

    if (offset < topThreshold) {
      setScrollState('top')
    } else if (offset + height > bottomThreshold) {
      setScrollState('bottom')
    } else {
      setScrollState(undefined)
    }
  }
}

interface GridItemKeyArg {
  columnIndex: number
  data: GridData
  rowIndex: number
}

export { gridItemKey, listItemKey, makeOnScroll, parseHeight }
