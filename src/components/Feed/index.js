import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { format } from 'timeago.js'
import Scrollbar from 'react-custom-scrollbars'

import css from './Feed.sass'
import useFeed from '../../hooks/useFeed'
import getApp from '../../store/selectors/app'

const dateFormat = (date) => format(date).replace(' ago', '')

const Feed = ({ url }) => {
  const { faviconProxy } = useSelector(getApp)
  const feed = useFeed(url)
  const parsedUrl = new URL(url)

  return (
    <div className={css.feed}>
      <div className={css.feedHeader}>
        <a
          className={classNames('nondraggable', css.feedIcon)}
          href={feed.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt={feed.title}
            src={`${faviconProxy}${parsedUrl.hostname}`}
            title={feed.title}
          />
        </a>
        <h2 className="nondraggable">
          <a
            href={feed.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            {feed.title}
          </a>
        </h2>
      </div>
      <Scrollbar autoHide>
        <ul className={css.feedList}>
          {feed.items.map((item) => (
            <li
              className={classNames('nondraggable', css.feedItem)}
              key={item.guid || item.id}
            >
              <a
                href={item.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className={css.itemTitle}>
                  {item.title}
                </span>
                <span className={css.itemDate}>
                  {dateFormat(item.isoDate)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Scrollbar>
      <div className={css.bottomPadding} />
    </div>
  )
}

Feed.propTypes = {
  url: PropTypes.string.isRequired,
}

export default Feed
