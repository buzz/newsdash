import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { format } from 'timeago.js'
import Tooltip from 'react-tooltip-lite'

import TooltipContent from './TooltipContent'
import { feedItemType } from '../../../../../../propTypes'

import css from './Item.sass'

const dateFormat = (date) => format(date).replace(' ago', '')

const ItemLink = ({ date, link, title }) => (
  <a
    href={link}
    rel="noopener noreferrer"
    target="_blank"
  >
    <span className={css.itemTitle}>
      {title}
    </span>
    <span className={css.itemDate}>
      {dateFormat(date)}
    </span>
  </a>
)

ItemLink.propTypes = {
  date: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

const Item = ({ item }) => {
  const tooltipContent = item.content
    ? (
      <TooltipContent
        imageUrl={item.imageUrl}
        text={item.content}
        title={item.title}
      />
    )
    : null

  const itemLink = <ItemLink date={item.date} link={item.link} title={item.title} />

  return (
    <li className={classNames('nondraggable', css.feedItem)}>
      {
        item.content
          ? (
            <Tooltip content={tooltipContent}>
              {itemLink}
            </Tooltip>
          )
          : itemLink
        }
    </li>
  )
}

Item.propTypes = {
  item: feedItemType.isRequired,
}

export default Item
