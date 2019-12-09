import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { NOTIFICATION_TYPES } from 'newsdash/constants'
import css from './Notification.sss'

const Notification = ({ message, title, type }) => (
  <div
    className={classNames(css.notification, {
      [css.danger]: type === NOTIFICATION_TYPES.ERROR,
    })}
  >
    <h3>{title}</h3>
    {message ? <p>{message}</p> : null}
  </div>
)

Notification.defaultProps = {
  message: null,
}

Notification.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Notification
