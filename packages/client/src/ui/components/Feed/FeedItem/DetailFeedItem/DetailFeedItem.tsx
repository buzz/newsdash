import { Image } from '@mantine/core'
import cx from 'clsx'

import TimeAgoBadge from '#ui/components/Feed/FeedItem/TimeAgoBadge/TimeAgoBadge'
import { makeFeedItemImageUrl } from '#ui/components/Feed/FeedItem/utils'
import Popover from '#ui/components/Feed/Popover/Popover'
import type { FeedItemProps } from '#ui/components/Feed/Feed'

import classes from './DetailFeedItem.module.css'
import feedItemClasses from '#ui/components/Feed/FeedItem/FeedItem.module.css'

function DetailFeedItem({ data, index, style }: FeedItemProps) {
  const feedItem = data[index]
  const imageUrl = makeFeedItemImageUrl(feedItem)
  const hasContent = Boolean(feedItem.content)

  const content = hasContent ? <div className={classes.teaserText}>{feedItem.content}</div> : null

  const timeAgoBadge = <TimeAgoBadge className={classes.badge} feedItem={feedItem} />

  const title = hasContent ? (
    <>
      <div className={classes.titleText}>{feedItem.title}</div>
      {timeAgoBadge}
    </>
  ) : (
    <>
      <div className={classes.titleText}>
        {timeAgoBadge}
        {feedItem.title}
      </div>
    </>
  )

  return (
    <div className={feedItemClasses.wrapper} style={style}>
      <Popover content={feedItem.content} imageUrl={imageUrl} title={feedItem.title}>
        <a
          className={cx(feedItemClasses.feedItem, classes.detailFeedItem)}
          href={feedItem.link}
          target="_blank"
          rel="noreferrer"
        >
          {imageUrl ? <Image className={classes.image} src={imageUrl} /> : null}
          <div className={classes.teaserText}>
            <div className={cx(classes.title, { [classes.noContent]: !hasContent })}>{title}</div>
            {content}
          </div>
        </a>
      </Popover>
    </div>
  )
}

export default DetailFeedItem
