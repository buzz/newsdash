import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { format } from 'timeago.js'
import Tooltip from 'react-tooltip-lite'

import css from './Feed.sass'
import { feedItemType } from '../../../propTypes'

const dateFormat = (date) => format(date).replace(' ago', '')

const TooltipContent = ({ imageUrl, text, title }) => {
  const image = imageUrl
    ? <img className={css.tooltipImage} src={imageUrl} alt={title} />
    : null
  return (
    <>
      {image}
      {text}
    </>
  )
}

TooltipContent.defaultProps = {
  imageUrl: null,
}

TooltipContent.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

const feedItemList = (feedItems) => (
  feedItems.map((item) => {
    const tooltipContent = item.content
      ? (
        <TooltipContent text={item.content} title={item.title} imageUrl={item.imageUrl} />
      )
      : null
    const itemLink = (
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
    )
    const itemComponent = item.content
      ? (
        <Tooltip content={tooltipContent}>
          {itemLink}
        </Tooltip>
      )
      : itemLink
    return (
      <li
        className={classNames('nondraggable', css.feedItem)}
        key={item.id}
      >
        {itemComponent}
      </li>
    )
  })
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
