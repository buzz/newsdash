import { Image } from '@mantine/core'
import cx from 'clsx'

import TimeAgoBadge from '#ui/components/Feed/FeedItem/TimeAgoBadge/TimeAgoBadge'
import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItem/types'

import classes from './DetailFeedItem.module.css'

function DetailFeedItem({ feedItem, imageUrl, language }: FeedItemComponentProps) {
  const hasContent = Boolean(feedItem.content)
  const content = hasContent ? (
    <div className={classes.teaserText} lang={language}>
      {feedItem.content}
    </div>
  ) : null

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
    <>
      {imageUrl ? <Image className={classes.image} src={imageUrl} /> : null}
      <div className={classes.teaserText}>
        <div className={cx(classes.title, { [classes.noContent]: !hasContent })}>{title}</div>
        {content}
      </div>
    </>
  )
}

export default DetailFeedItem
