import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { format } from 'timeago.js'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import TooltipContent from './TooltipContent'
import { feedItemType } from '../../../../../../../propTypes'

import css from './Item.sass'

const dateFormat = (date) => (
  format(date)
    .replace(/minutes?/, 'min')
    .replace(/hours?/, 'h')
    .replace(' ago', '')
)

const ItemDate = ({ date }) => {
  const [redrawTimer, setRedrawTimer] = useState(0)
  useEffect(() => {
    const interval = setInterval(
      () => setRedrawTimer((old) => old + 1),
      15 * 1000
    )
    return () => clearInterval(interval)
  }, [redrawTimer])

  return (
    <span className={css.itemDate}>
      {dateFormat(date)}
    </span>
  )
}

ItemDate.propTypes = {
  date: PropTypes.number.isRequired,
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

  const itemDate = item.date
    ? <ItemDate date={item.date} />
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
      {itemDate}
    </a>
  )

  return (
    <li className={classNames('nondraggable', css.feedItem)}>
      {
        item.content
          ? (
            <Tooltip
              mouseLeaveDelay={0}
              overlay={tooltipContent}
              overlayClassName={css.tooltip}
              placement="bottom"
            >
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
