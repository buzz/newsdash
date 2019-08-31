import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faRss } from '@fortawesome/free-solid-svg-icons'

import css from './Feed.sass'

const Header = ({
  editMode,
  iconUrl,
  link,
  onEditClick,
  title,
}) => {
  const icon = iconUrl
    ? (
      <img
        alt={title}
        src={iconUrl}
        title={title}
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

  const feedTitle = link
    ? (
      <h2 className="nondraggable">
        <a
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
        title="Edit feed"
        type="button"
        onClick={onEditClick}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    )

  return (
    <div className={css.feedHeader}>
      {iconLink}
      <span className={css.feedHeaderMiddle}>
        {feedTitle}
      </span>
      {editButton}
    </div>
  )
}

Header.propTypes = {
  editMode: PropTypes.bool.isRequired,
  iconUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  onEditClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default Header
