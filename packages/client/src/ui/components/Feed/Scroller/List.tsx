import cx from 'clsx'
import { memo, useMemo } from 'react'
import { FixedSizeList, type ListChildComponentProps } from 'react-window'

import FeedItem from '#ui/components/Feed/FeedItem/FeedItem'

import { listItemKey, makeOnScroll } from './utils'
import type { ListData, WindowProps } from './types'

import classes from './Scroller.module.css'

const ListRow = memo(function ListRow({
  data: { items, tab },
  index,
  style,
}: ListChildComponentProps<ListData>) {
  return (
    <div className={cx(classes.row, { [classes.last]: index === items.length - 1 })} style={style}>
      <FeedItem feedItem={items[index]} tab={tab} />
    </div>
  )
})

function List({ height, items, rowHeight, setScrollState, tab, ...otherProps }: WindowProps) {
  const itemCount = items.length
  const itemData = useMemo(() => ({ items, tab }), [items, tab])

  return (
    <FixedSizeList
      height={height}
      itemCount={itemCount}
      itemData={itemData}
      itemKey={listItemKey}
      itemSize={rowHeight}
      onScroll={makeOnScroll('list', height, rowHeight, itemCount, setScrollState)}
      {...otherProps}
    >
      {ListRow}
    </FixedSizeList>
  )
}

export default List