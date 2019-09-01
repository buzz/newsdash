import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Scrollbar from 'react-custom-scrollbars'

import css from './Feed.sass'
import Header from './Header'
import List from './body/List'
import Edit from './body/Edit'
import LoadingSpinner from './LoadingSpinner'
import getApp from '../../../store/selectors/app'
import feedSelectors from '../../../store/selectors/feed'
import feedItemSelectors from '../../../store/selectors/feedItem'
import { deleteFeed, editFeed } from '../../../store/actions/feed'
import { FEED_STATUS } from '../../../constants'

const Feed = ({ id, url }) => {
  const dispatch = useDispatch()
  const [editMode, setEditMode] = useState(url === '')
  const { faviconProxy } = useSelector(getApp)
  const getFeed = useMemo(feedSelectors.makeGetFeed, [])
  const getFeedItems = useMemo(feedItemSelectors.makeGetFeedItems, [])
  const feed = useSelector((state) => getFeed(state, id))
  const feedItems = useSelector((state) => getFeedItems(state, id))

  const iconUrl = url.startsWith('http')
    ? `${faviconProxy}${(new URL(url)).hostname}`
    : ''

  const deleteFeedClick = () => {
    dispatch(deleteFeed(id))
    setEditMode(false)
  }

  const editFeedClick = (editedFeed) => {
    dispatch(editFeed(id, editedFeed, feed))
    setEditMode(false)
  }

  let body
  if (editMode) {
    body = (
      <Edit
        onCancelClick={() => setEditMode(false)}
        onDeleteClick={deleteFeedClick}
        onOkClick={editFeedClick}
        feed={feed}
      />
    )
  } else {
    switch (feed.status) {
      case FEED_STATUS.ERROR:
        body = (
          <div className={css.feedMessage}>
            <div>{feed.error}</div>
          </div>
        )
        break
      case FEED_STATUS.LOADING:
        body = (
          <div className={css.feedMessage}>
            <LoadingSpinner />
          </div>
        )
        break
      case FEED_STATUS.LOADED:
        body = <List items={feedItems} />
        break
      default:
        break
    }
  }

  return (
    <div className={css.feed}>
      <Header
        editMode={editMode}
        iconUrl={iconUrl}
        link={feed.link}
        onEditClick={() => setEditMode(true)}
        status={feed.status}
        title={feed.title}
      />
      <Scrollbar autoHide>
        {body}
      </Scrollbar>
      <div className={css.bottomPadding} />
    </div>
  )
}

Feed.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Feed
