import cx from 'clsx'
import { memo, useMemo } from 'react'
import { FixedSizeList, type ListChildComponentProps } from 'react-window'

import { SCROLLER_PADDING_Y } from '#constants'
import FeedItem from '#ui/components/Feed/FeedItem/FeedItem'

import { listItemKey, parseHeight } from './utils'
import type { GridListProps, ListData } from './types'

import classes from './List.module.css'

const ListRow = memo(function ListRow({
  data: { items, tab },
  index,
  style,
}: ListChildComponentProps<ListData>) {
  return (
    <div
      className={cx(classes.row, { [classes.last]: index === items.length - 1 })}
      style={{ ...style, top: `${parseHeight(style.top) + SCROLLER_PADDING_Y}px` }}
    >
      <FeedItem feedItem={items[index]} tab={tab} />
    </div>
  )
})

function List({ height, items, rowHeight, tab, innerElementType, ...otherProps }: GridListProps) {
  const itemCount = items.length
  const itemData = useMemo(() => ({ items, tab }), [items, tab])

  return (
    <FixedSizeList
      {...otherProps}
      width="100%"
      height={height}
      innerElementType={innerElementType}
      itemCount={itemCount}
      itemData={itemData}
      itemKey={listItemKey}
      itemSize={rowHeight}
    >
      {ListRow}
    </FixedSizeList>
  )
}

export default List
