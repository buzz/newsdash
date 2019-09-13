import React from 'react'
import PropTypes from 'prop-types'

import { feedItemType } from '../../../../../../propTypes'

const Regular = () => {
  return 'regular display'
}

Regular.propTypes = {
  items: PropTypes.arrayOf(feedItemType).isRequired,
}

export default Regular
