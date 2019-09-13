import React from 'react'
import PropTypes from 'prop-types'

import { feedItemType } from '../../../../../../propTypes'

const Tiles = () => {
  return 'tiles display'
}

Tiles.propTypes = {
  items: PropTypes.arrayOf(feedItemType).isRequired,
}

export default Tiles
