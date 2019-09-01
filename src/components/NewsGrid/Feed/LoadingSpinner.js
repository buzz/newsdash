import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import css from './Feed.sass'

const LoadingSpinner = () => (
  <div className={css.loadingSpinner}>
    <FontAwesomeIcon icon={faSpinner} spin />
  </div>
)

export default LoadingSpinner
