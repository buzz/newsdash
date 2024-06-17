import cx from 'clsx'

import TimeAgoBadge from '#ui/components/Feed/FeedItem/TimeAgoBadge/TimeAgoBadge'
import { makeFeedItemImageUrl } from '#ui/components/Feed/FeedItem/utils'
import Popover from '#ui/components/Feed/Popover/Popover'
import type { FeedItemProps } from '#ui/components/Feed/Feed'

import classes from './ListFeedItem.module.css'
import feedItemClasses from '#ui/components/Feed/FeedItem/FeedItem.module.css'

function ListFeedItem({ condensed = false, data, index, style }: ListFeedItemProps) {
  const feedItem = data[index]
  const imageUrl = makeFeedItemImageUrl(feedItem)

  return (
    <div className={feedItemClasses.wrapper} style={style}>
      <Popover content={feedItem.content} imageUrl={imageUrl} title={feedItem.title}>
        <a
          className={cx(feedItemClasses.feedItem, classes.listFeedItem, {
            [classes.condensed]: condensed,
          })}
          href={feedItem.link}
          target="_blank"
          rel="noreferrer"
        >
          <div className={classes.title}>{feedItem.title}</div>
          <TimeAgoBadge feedItem={feedItem} />
        </a>
      </Popover>
    </div>
  )
}

interface ListFeedItemProps extends FeedItemProps {
  condensed?: boolean
}

export default ListFeedItem
