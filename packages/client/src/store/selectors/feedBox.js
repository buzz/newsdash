import { createSelector } from 'redux-orm'
import tinycolor from 'tinycolor2'

import orm from 'newsdash/store/orm'
import getOrm from './orm'

const getColors = (hue) => {
  const baseColor = tinycolor({ h: hue, s: 1.0, l: 0.5 }).desaturate(85).lighten(45)
  return {
    bg: baseColor.toHexString(),
    border: baseColor.clone().darken(20).toHexString(),
    headerBg: baseColor.clone().darken(9).toHexString(),
    tabsBg: baseColor.clone().darken(4).toHexString(),
  }
}

const getFeedBoxes = createSelector(
  orm,
  getOrm,
  (session) => session
    .FeedBox
    .all()
    .toModelArray()
    .map((feedBox) => ({
      ...feedBox.ref,
      feeds: feedBox
        .feeds
        .toRefArray()
        .sort((a, b) => a.index - b.index),
      colors: getColors(feedBox.hue),
    }))
)

export default {
  getFeedBoxes,
}
