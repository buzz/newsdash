import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import List from './List'
import feedItemSelectors from '../../../../../store/selectors/feedItem'
import { feedType } from '../../../../../propTypes'
import { FEED_STATUS } from '../../../../../constants'
import css from '../Body.sass'

const Feed = ({ feed }) => {
  const getFeedItems = useMemo(feedItemSelectors.makeGetFeedItems, [])
  const feedItems = useSelector((state) => getFeedItems(state, feed ? feed.id : null))

  if (feed.status === FEED_STATUS.ERROR) {
    return (
      <div className={css.feedMessage}>
        <p>
          <strong>Sorry, unable to retrieve the feed!</strong>
        </p>
        <p>
          URL:
          {' '}
          <a
            className="nondraggable"
            href={feed.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <code>{feed.url}</code>
          </a>
          <br />
          Error message:
          {' '}
          <code>{feed.error}</code>
        </p>
      </div>
    )
  }

  if (feed.status === FEED_STATUS.LOADING && !feedItems.length) {
    return (
      <div className={css.feedMessage}>
        <p>Loading feed…</p>
      </div>
    )
  }

  return <List items={feedItems} />
}

Feed.propTypes = {
  feed: feedType.isRequired,
}

export default Feed
