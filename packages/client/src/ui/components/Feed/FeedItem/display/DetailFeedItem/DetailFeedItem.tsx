import cx from 'clsx'

import FailableImage from '#ui/components/common/FailableImage'
import TimeAgoBadge from '#ui/components/Feed/FeedItem/TimeAgoBadge/TimeAgoBadge'
import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItem/types'

import classes from './DetailFeedItem.module.css'

function DetailFeedItem({ feedItem, imageUrl, language }: FeedItemComponentProps) {
  const hasContent = Boolean(feedItem.content)

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
      <FailableImage alt={feedItem.title} className={classes.image} src={imageUrl} />
      <div className={classes.teaserText}>
        <div className={cx(classes.title, { [classes.noContent]: !hasContent })}>{title}</div>
        {hasContent && (
          <div className={classes.teaserText} lang={language}>
            {feedItem.content}
          </div>
        )}
      </div>
    </>
  )
}

export default DetailFeedItem
