import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faRss } from '@fortawesome/free-solid-svg-icons'

import css from './Header.sass'
import { FEED_STATUS } from '../../../../constants'
import { feedStatusType } from '../../../../propTypes'

const getTitle = (feedTitle, editMode, status) => {
  switch (status) {
    case FEED_STATUS.NEW:
      return 'Add feed'
    case FEED_STATUS.LOADING:
      return `Loading: ${feedTitle}`
    case FEED_STATUS.ERROR:
      return `Error: ${feedTitle}`
    default:
  }
  if (editMode) {
    return `Edit: ${feedTitle}`
  }
  return feedTitle
}

const Header = ({
  editMode,
  iconUrl,
  link,
  onEditClick,
  status,
  title: feedTitle,
}) => {
  const icon = iconUrl
    ? (
      <img
        alt={feedTitle}
        src={iconUrl}
        title={feedTitle}
      />
    )
    : <FontAwesomeIcon icon={faRss} />

  const iconLink = link
    ? (
      <a
        className={classNames('nondraggable', css.feedIcon)}
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {icon}
      </a>
    )
    : (
      <span className={css.feedIcon}>
        {icon}
      </span>
    )

  const title = getTitle(feedTitle, editMode, status)

  const headerTitle = link && !editMode
    ? (
      <h2>
        <a
          className="nondraggable"
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {title}
        </a>
      </h2>
    )
    : <h2>{title}</h2>

  const editButton = editMode
    ? null
    : (
      <button
        aria-label="Edit feed"
        className={classNames('nondraggable', css.headerButton)}
        title="Edit"
        type="button"
        onClick={onEditClick}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    )

  return (
    <div className={css.feedHeader}>
      {iconLink}
      {headerTitle}
      {editButton}
    </div>
  )
}

Header.propTypes = {
  editMode: PropTypes.bool.isRequired,
  iconUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  status: feedStatusType.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
