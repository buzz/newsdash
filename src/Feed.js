import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Parser from 'rss-parser'
import { format } from 'timeago.js'

import css from './Feed.sass'

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

const parser = new Parser()

const dateFormat = (date) => format(date).replace(' ago', '')

const Feed = ({ url }) => {
  const [feed, setFeed] = useState({
    title: 'Loading…',
    items: [],
  })
  useEffect(() => {
    const fetchData = async () => {
      const data = await parser.parseURL(CORS_PROXY + url)
      setFeed(data)
      console.log(data)
      data.items.forEach((item) => {
        console.log(`${item.title}:${item.link}`)
        console.log(item)
      })
      console.log('-----------------------------------------')
    }
    fetchData()
  }, [url])

  const parsedUrl = new URL(url)

  const feedIcon = feed.image
    ? (
      <a
        className={classNames('nondraggable', css.feedIcon)}
        href={feed.link}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt={feed.image.title || feed.title}
          src={`https://favicon.keeweb.info/${parsedUrl.hostname}`}
          title={feed.image.title || feed.title}
        />
      </a>
    )
    : null

  return (
    <div className={css.feed}>
      <div className={css.feedHeader}>
        {feedIcon}
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
      <div className={css.feedList}>
        <ul>
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
      </div>
    </div>
  )
}

Feed.propTypes = {
  url: PropTypes.string.isRequired,
}

export default Feed
