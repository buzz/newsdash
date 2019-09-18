import React from 'react'
import classNames from 'classnames'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

import { feedItemType, feedItemListType } from 'newsdash/components/propTypes'
import { FEED_DISPLAY } from 'newsdash/constants'
import Date from 'newsdash/components/Feed/Date'

import Image from './Image'
import TooltipContent from './TooltipContent'
import css from './Item.sass'

const Item = ({ item, type }) => {
  const tooltipContent = item.content
    ? (
      <TooltipContent
        imageUrl={type !== FEED_DISPLAY.DETAILED ? item.imageUrl : null}
        text={item.content}
        title={item.title}
      />
    )
    : null

  const date = item.date
    ? <Date className={css.date} date={item.date} />
    : null

  const itemDisplay = type === FEED_DISPLAY.DETAILED
    ? (
      <>
        <Image
          alt={item.title}
          className={css.itemImage}
          src={item.imageUrl}
        />
        <span className={css.itemText}>
          <span className={css.titleLine}>
            <span className={css.itemTitle}>
              {item.title}
            </span>
            {date}
          </span>
          <span className={css.itemContent}>
            {item.content}
          </span>
        </span>
      </>
    )
    : (
      <>
        <span className={css.itemTitle}>
          {item.title}
        </span>
        {date}
      </>
    )

  const itemLink = (
    <a
      href={item.link}
      rel="noopener noreferrer"
      target="_blank"
    >
      {itemDisplay}
    </a>
  )

  const feedItemClassNames = classNames(
    'nondraggable',
    css.feedItem,
    {
      [css.detailed]: type === FEED_DISPLAY.DETAILED,
      [css.condensed]: type === FEED_DISPLAY.CONDENSED_LIST,
      [css.new]: item.new,
    }
  )

  return (
    <li className={feedItemClassNames}>
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
  type: feedItemListType.isRequired,
  item: feedItemType.isRequired,
}

export default Item
