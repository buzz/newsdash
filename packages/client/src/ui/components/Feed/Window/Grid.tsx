import cx from 'clsx'
import { memo, useMemo } from 'react'
import { FixedSizeGrid, type GridChildComponentProps } from 'react-window'

import { IMG_WIDTH } from '@newsdash/common/constants'

import { SCROLLER_PADDING_Y } from '#constants'
import FeedItem from '#ui/components/Feed/FeedItem/FeedItem'

import { gridItemKey, parseHeight } from './utils'
import type { GridData, ListProps } from './types'

import classes from './Grid.module.css'

const GridCell = memo(function GridCell({
  data: { columnCount, rowCount, items, tab },
  columnIndex,
  rowIndex,
  style,
}: GridChildComponentProps<GridData>) {
  const itemIndex = rowIndex * columnCount + columnIndex
  return (
    <div
      className={cx(classes.cell, {
        [classes.lastCol]: columnIndex === columnCount - 1,
        [classes.lastRow]: rowIndex === rowCount - 1,
      })}
      style={{ ...style, top: `${parseHeight(style.top) + SCROLLER_PADDING_Y}px` }}
    >
      {itemIndex < items.length && <FeedItem feedItem={items[itemIndex]} tab={tab} />}
    </div>
  )
})

function Grid({ width, items, overscanCount, tab, ...otherProps }: GridProps) {
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

interface GridProps extends ListProps {
  width: number
}

export default Grid
