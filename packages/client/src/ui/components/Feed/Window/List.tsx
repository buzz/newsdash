import cx from 'clsx'
import { memo, useMemo } from 'react'
import { FixedSizeList, type ListChildComponentProps } from 'react-window'

import { SCROLLER_PADDING_Y } from '#constants'
import FeedItem from '#ui/components/Feed/FeedItem/FeedItem'

import { listItemKey, parseHeight } from './utils'
import type { ListData, ListProps } from './types'

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

function List({ items, rowHeight, tab, innerElementType, ...otherProps }: ListProps) {
  const itemCount = items.length
  const itemData = useMemo(() => ({ items, tab }), [items, tab])

  return (
    <FixedSizeList
      innerElementType={innerElementType}
      itemCount={itemCount}
      itemData={itemData}
      itemKey={listItemKey}
      itemSize={rowHeight}
      width="100%"
      {...otherProps}
    >
      {ListRow}
    </FixedSizeList>
  )
}

export default List
