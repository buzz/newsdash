import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'

import { feedType } from 'newsdash/components/propTypes'
import css from './Icon.sss'

const getFaviconUrl = (url) => {
  const { origin } = new URL(url)
  return new URL('favicon.ico', origin)
}

const Icon = ({ className, feed, noLink }) => {
  const faviconUrl = feed && feed.link ? getFaviconUrl(feed.link) : null
  const icon = faviconUrl
    ? <img alt={feed.title} src={faviconUrl} title={feed.title} />
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

Icon.defaultProps = {
  className: null,
  feed: null,
  noLink: false,
}

Icon.propTypes = {
  className: PropTypes.string,
  feed: feedType,
  noLink: PropTypes.bool,
}

export default Icon
