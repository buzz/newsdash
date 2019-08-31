import PropTypes from 'prop-types'

import { FEED_STATUS } from './constants'

export const feedType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(FEED_STATUS)).isRequired,
  error: PropTypes.string,
  lastFetched: PropTypes.number,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
})

export const feedItemType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrl: PropTypes.string,
})
