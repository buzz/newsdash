import cx from 'clsx'
import type { ComponentType } from 'react'
import type { ListChildComponentProps } from 'react-window'

import type { Display } from '@newsdash/schema'

import Popover from '#ui/components/Feed/FeedItemRow/Popover/Popover'
import { makeFeedItemImageUrl } from '#ui/components/Feed/utils'
import type { FeedItem as FeedItemRow } from '#types/feed'
import type { GridData } from '#ui/components/Feed/Feed'
import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItemRow/types'

import DetailFeedItem from './DetailFeedItem/DetailFeedItem'
import ListFeedItem from './ListFeedItem/ListFeedItem'
import TileFeedItem from './TileFeedItem/TileFeedItem'

import classes from './FeedItemRow.module.css'

const DISPLAY_COMPONENT: Record<
  Display,
  { component: ComponentType<FeedItemComponentProps>; className: string }
> = {
  condensedList: {
    component: ListFeedItem,
    className: 'condensedList',
  },
  list: {
    component: ListFeedItem,
    className: 'list',
  },
  detailed: {
    component: DetailFeedItem,
    className: 'detail',
  },
  tiles: {
    component: TileFeedItem,
    className: 'tile',
  },
}

function FeedItemRow({
  data: { display, items, columnCount },
  index,
  style,
}: ListChildComponentProps<GridData>) {
  const startIndex = index * columnCount
  const itemSlice = items.slice(startIndex, startIndex + columnCount)

  const { component: FeedItemComponent, className } = DISPLAY_COMPONENT[display]

  const itemStyle = { flexBasis: `${100 / columnCount}%` }

  const feedItems = itemSlice.map((feedItem) => {
    const imageUrl = makeFeedItemImageUrl(feedItem)
    return (
      <Popover
        content={feedItem.content}
        date={feedItem.date}
        imageUrl={imageUrl}
        title={feedItem.title}
        key={feedItem.id}
      >
        {({ onMouseEnter, onMouseLeave }) => (
          <a
            className={cx(classes.feedItem, classes[className])}
            href={feedItem.link}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            rel="noreferrer"
            style={itemStyle}
            target="_blank"
          >
            <FeedItemComponent feedItem={feedItem} imageUrl={imageUrl} />
          </a>
        )}
      </Popover>
    )
  })

  // Fill up last row with dummies
  for (let i = feedItems.length; i < columnCount; ++i) {
    feedItems.push(<div className={classes.dummy} style={itemStyle} key={`dummy${i}`}></div>)
  }

  return (
    <div className={classes.row} style={style}>
      {feedItems}
    </div>
  )
}

export default FeedItemRow
