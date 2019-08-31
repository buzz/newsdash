import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { format } from 'timeago.js'

import css from './Feed.sass'
import { feedItemType } from '../../../propTypes'

const dateFormat = (date) => format(date).replace(' ago', '')

const feedItemList = (feedItems) => (
  feedItems.map((item) => (
    <li
      className={classNames('nondraggable', css.feedItem)}
      key={item.id}
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
          {dateFormat(item.date)}
        </span>
      </a>
    </li>
  ))
)

const List = ({ items }) => (
  <ul className={css.feedList}>
    {feedItemList(items)}
  </ul>
)

List.propTypes = {
  items: PropTypes.arrayOf(feedItemType).isRequired,
}

export default List
