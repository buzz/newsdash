import { Badge, Image } from '@mantine/core'
import cx from 'clsx'
import type { CSSProperties } from 'react'

import Popover from '#ui/components/Feed/Popover/Popover'
import TimeAgo from '#ui/components/Feed/TimeAgo'
import type { FeedItem } from '#types/feed'

import classes from './DetailFeedItem.module.css'

function makeFeedItemImageUrl(feedItem: FeedItem) {
  return feedItem.link
    ? `${import.meta.env.NEWSDASH_API_BASE}feed/image?url=${encodeURIComponent(feedItem.link)}`
    : undefined
}

function DetailFeedItem({ data, index, style }: DetailFeedItemProps) {
  const feedItem = data[index]
  const imageUrl = makeFeedItemImageUrl(feedItem)
  const hasContent = Boolean(feedItem.content)

  const content = hasContent ? <div className={classes.teaserText}>{feedItem.content}</div> : null

  const title = hasContent ? (
    <>
      <div className={classes.titleText}>{feedItem.title}</div>
      <Badge className={cx(classes.badge, { [classes.new]: feedItem.new })} radius="sm" size="sm">
        <TimeAgo date={feedItem.date} />
      </Badge>
    </>
  ) : (
    <>
      <div className={classes.titleText}>
        <Badge className={cx(classes.badge, { [classes.new]: feedItem.new })} radius="sm" size="sm">
          <TimeAgo date={feedItem.date} />
        </Badge>
        {feedItem.title}
      </div>
    </>
  )

  return (
    <div className={classes.feedItemWrapper} style={style}>
      <Popover content={feedItem.content} imageUrl={imageUrl} title={feedItem.title}>
        <a className={classes.feedItem} href={feedItem.link} target="_blank" rel="noreferrer">
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

interface DetailFeedItemProps {
  data: FeedItem[]
  index: number
  style: CSSProperties
}

export default DetailFeedItem
