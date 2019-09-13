import PropTypes from 'prop-types'

import { FEED_STATUS, FEED_DISPLAY } from './constants'

const colorsType = PropTypes.shape({
  bg: PropTypes.string.isRequired,
  border: PropTypes.string.isRequired,
  headerBg: PropTypes.string.isRequired,
  tabsBg: PropTypes.string.isRequired,
})

export const feedBoxType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  colors: colorsType.isRequired,
  hue: PropTypes.number.isRequired,
  title: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
})

export const feedItemType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  date: PropTypes.number,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  imageUrl: PropTypes.string,
})

export const feedType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  customTitle: PropTypes.string,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(FEED_STATUS)),
  display: PropTypes.oneOf(Object.values(FEED_DISPLAY)),
  error: PropTypes.string,
  index: PropTypes.number.isRequired,
  lastFetched: PropTypes.number,
  useCorsProxy: PropTypes.bool.isRequired,
})
