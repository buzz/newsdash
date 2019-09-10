import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSync } from '@fortawesome/free-solid-svg-icons'

import css from './Header.sass'
import { FEED_STATUS } from '../../../../constants'
import { feedBoxType, feedType } from '../../../../propTypes'
import { refreshFeed } from '../../../../store/actions/feed'
import FeedIcon from '../../../FeedIcon'

const getTitle = (feed, feedBox, editMode) => {
  if (editMode) {
    return 'Edit'
  }
  if (feedBox.title) {
    return feedBox.title
  }
  if (!feed) {
    return ''
  }
  return feed.customTitle || feed.title
}

const Header = ({
  feed,
  feedBox,
  editMode,
  onEditClick,
}) => {
  const dispatch = useDispatch()
  const title = getTitle(feed, feedBox, editMode)

  const icon = editMode || !feed
    ? <FeedIcon className={css.feedIcon} />
    : <FeedIcon className={css.feedIcon} feed={feed} />

  const headerTitle = feed && feed.link && !editMode
    ? (
      <h2>
        <a
          className="nondraggable"
          href={feed.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {title}
        </a>
      </h2>
    )
    : <h2>{title}</h2>

  const isLoading = feed && feed.status === FEED_STATUS.LOADING

  const buttons = editMode
    ? null
    : (
      <div className={classNames('nondraggable', css.buttons)}>
        <button
          aria-label="Refresh feed"
          disabled={isLoading || !feed}
          title="Refresh"
          type="button"
          onClick={() => dispatch(refreshFeed(feed.id))}
        >
          <FontAwesomeIcon icon={faSync} spin={isLoading} />
        </button>
        <button
          aria-label="Edit feed"
          title="Edit"
          type="button"
          onClick={onEditClick}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </div>
    )

  const headerStyle = {
    backgroundColor: feedBox.colors.headerBg,
    borderColor: feedBox.colors.border,
  }

  return (
    <div className={css.feedHeader} style={headerStyle}>
      {icon}
      {headerTitle}
      {buttons}
    </div>
  )
}

Header.defaultProps = {
  feed: null,
}

Header.propTypes = {
  feed: feedType,
  feedBox: feedBoxType.isRequired,
  editMode: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
}

export default Header
