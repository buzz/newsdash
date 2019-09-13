import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'timeago.js'

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

export default ItemDate
