import cx from 'clsx'
import { memo, useMemo } from 'react'
import { FixedSizeGrid, type GridChildComponentProps } from 'react-window'

import { IMG_WIDTH } from '@newsdash/common/constants'

import { SCROLLER_PADDING_Y } from '#constants'
import FeedItem from '#ui/components/Feed/FeedItem/FeedItem'

import { gridItemKey, parseHeight } from './utils'
import type { GridData, GridListProps } from './types'

import classes from './Grid.module.css'

const GridCell = memo(function GridCell({
  data: { columnCount, rowCount, items, tab },
  columnIndex,
  rowIndex,
  style,
}: GridChildComponentProps<GridData>) {
  const itemIndex = rowIndex * columnCount + columnIndex
  const item = itemIndex < items.length ? <FeedItem feedItem={items[itemIndex]} tab={tab} /> : null
  return (
    <div
      className={cx(classes.cell, {
        [classes.lastCol]: columnIndex === columnCount - 1,
        [classes.lastRow]: rowIndex === rowCount - 1,
      })}
      style={{ ...style, top: `${parseHeight(style.top) + SCROLLER_PADDING_Y}px` }}
    >
      {item}
    </div>
  )
})

function Grid({ width, items, overscanCount, tab, ...otherProps }: GridListProps) {
  const maxColumnWidth = tab.display === 'tiles' ? IMG_WIDTH : tab.maxColumnWidth
  const columnCount = Math.max(1, Math.floor(width / maxColumnWidth) + 1)
  const itemCount = items.length
  const rowCount = Math.ceil(itemCount / columnCount)
  const itemData = useMemo(
    () => ({ columnCount, rowCount, items, tab }),
    [columnCount, rowCount, items, tab]
  )

  return (
    <FixedSizeGrid
      columnCount={columnCount}
      columnWidth={width / columnCount}
      rowCount={rowCount}
      width={width}
      itemData={itemData}
      itemKey={gridItemKey}
      overscanRowCount={overscanCount}
      {...otherProps}
    >
      {GridCell}
    </FixedSizeGrid>
  )
}

export default Grid
