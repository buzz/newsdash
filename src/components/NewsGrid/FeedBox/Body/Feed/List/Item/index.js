import React from 'react'
import classNames from 'classnames'
import { format } from 'timeago.js'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import TooltipContent from './TooltipContent'
import { feedItemType } from '../../../../../../../propTypes'

import css from './Item.sass'

const dateFormat = (date) => format(date).replace(' ago', '')

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
    ? (
      <span className={css.itemDate}>
        {dateFormat(item.date)}
      </span>
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
