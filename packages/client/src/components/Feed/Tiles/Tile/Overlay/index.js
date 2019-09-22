import React from 'react'
import PropTypes from 'prop-types'

import { feedItemType } from 'newsdash/components/propTypes'
import Date from 'newsdash/components/Feed/Date'
import css from './Overlay.sass'

const Overlay = ({ className, item }) => {
  const date = item.date
    ? <Date className={css.date} date={item.date} />
    : null
  const content = item.content
    ? (
      <p className={css.content}>
        {item.content}
      </p>
    )
    : null

  return (
    <div className={className}>
      <div className={css.caption}>
        <h2 className={css.title}>{item.title}</h2>
        {date}
      </div>
      {content}
    </div>
  )
}

Overlay.propTypes = {
  className: PropTypes.string.isRequired,
  item: feedItemType.isRequired,
}

export default Overlay
