import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { format } from 'timeago.js'

import css from './Date.sass'

const dateFormat = (date) => (
  format(date)
    .replace(/minutes?/, 'min')
    .replace(/hours?/, 'h')
    .replace(' ago', '')
)

const ItemDate = ({ className, date }) => {
  const [redrawTimer, setRedrawTimer] = useState(0)
  useEffect(() => {
    const interval = setInterval(
      () => setRedrawTimer((old) => old + 1),
      15 * 1000
    )
    return () => clearInterval(interval)
  }, [redrawTimer])

  return (
    <span className={classNames(className, css.date)}>
      {dateFormat(date)}
    </span>
  )
}

ItemDate.defaultProps = {
  className: null,
}

ItemDate.propTypes = {
  className: PropTypes.string,
  date: PropTypes.number.isRequired,
}

export default ItemDate
