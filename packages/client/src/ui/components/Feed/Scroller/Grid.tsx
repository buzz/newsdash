import cx from 'clsx'
import { memo, useMemo } from 'react'
import { FixedSizeGrid, type GridChildComponentProps } from 'react-window'

import { SCROLLER_PADDING_Y } from '#constants'
import FeedItem from '#ui/components/Feed/FeedItem/FeedItem'

import { gridItemKey, makeOnScroll, parseHeight } from './utils'
import type { GridData, WindowProps } from './types'

import classes from './Scroller.module.css'

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

function Grid({
  width,
  height,
  items,
  overscanCount,
  rowHeight,
  tab,
  innerElementType,
  setScrollState,
  ...otherProps
}: WindowProps) {
  const itemCount = items.length
  const columnCount = Math.max(1, Math.floor(width / tab.minColumnWidth))
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
      rowHeight={rowHeight}
      width={width}
      height={height}
      innerElementType={innerElementType}
      itemData={itemData}
      itemKey={gridItemKey}
      overscanRowCount={overscanCount}
      onScroll={makeOnScroll('grid', height, rowHeight, rowCount, setScrollState)}
      {...otherProps}
    >
      {GridCell}
    </FixedSizeGrid>
  )
}

export default Grid
