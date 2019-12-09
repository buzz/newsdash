import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import css from './ConfirmButton.sss'

const ConfirmButton = ({ children, icon, onClick }) => {
  const [activated, setActivated] = useState(false)
  const faIcon = icon ? <FontAwesomeIcon icon={icon} /> : null
  const onConfirmed = () => {
    setActivated(false)
    onClick()
  }
  return activated ? (
    <button className={css.confirm} onClick={onConfirmed} type="button">
      {faIcon}
      Really?
    </button>
  ) : (
    <button onClick={() => setActivated(true)} type="button">
      {faIcon}
      {children}
    </button>
  )
}

ConfirmButton.defaultProps = {
  icon: null,
}

ConfirmButton.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.object,
  onClick: PropTypes.func.isRequired,
}

export default ConfirmButton
