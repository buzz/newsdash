import cx from 'clsx'

import Tooltip from '#ui/components/common/Tooltip'
import TimeAgoBadge from '#ui/components/Feed/FeedItem/TimeAgoBadge/TimeAgoBadge'
import type { FeedItemComponentProps } from '#ui/components/Feed/FeedItem/types'

import classes from './TileFeedItem.module.css'

function TileFeedItem({ feedItem, imageUrl, language }: FeedItemComponentProps) {
  return (
    <div className={cx(classes.wrapper, { [classes.slideUp]: Boolean(feedItem.content) })}>
      <img alt={feedItem.title} className={classes.image} src={imageUrl} />
      <div className={classes.textOverlay} lang={language}>
        <Tooltip label={feedItem.title}>
          <div className={classes.title}>
            <TimeAgoBadge className={classes.badge} feedItem={feedItem} />
            {feedItem.title}
          </div>
        </Tooltip>
        <div className={classes.content}>{feedItem.content}</div>
      </div>
    </div>
  )
}

export default TileFeedItem
