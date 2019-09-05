import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'

import { feedType } from '../../propTypes'
import getApp from '../../store/selectors/app'
import css from './FeedIcon.sass'

const FeedIcon = ({ className, feed, noLink }) => {
  const { faviconProxy } = useSelector(getApp)

  const iconUrl = feed && feed.url.startsWith('http')
    ? `${faviconProxy}${(new URL(feed.url)).hostname}`
    : null

  const icon = iconUrl
    ? <img alt={feed.title} src={iconUrl} title={feed.title} />
    : <FontAwesomeIcon icon={faRss} />

  return feed && feed.link && !noLink
    ? (
      <a
        className={classNames('nondraggable', className, css.feedIcon)}
        href={feed.link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {icon}
      </a>
    )
    : (
      <span className={classNames(className, css.feedIcon)}>
        {icon}
      </span>
    )
}

FeedIcon.defaultProps = {
  className: null,
  feed: null,
  noLink: false,
}

FeedIcon.propTypes = {
  className: PropTypes.string,
  feed: feedType,
  noLink: PropTypes.bool,
}

export default FeedIcon
