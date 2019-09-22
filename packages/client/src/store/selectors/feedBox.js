import { createSelector } from 'redux-orm'
import tinycolor from 'tinycolor2'

import orm from 'newsdash/store/orm'
import getOrm from './orm'

const getColors = (hue, lightness, saturation) => {
  const baseColor = tinycolor({ h: hue, s: 1.0, l: 0.5 })
    .desaturate(100 - saturation)
    .lighten(25 + 25 * (lightness / 100))
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
  (session) => {
    const { lightness, saturation } = session.App.first().ref
    return session
      .FeedBox
      .all()
      .toModelArray()
      .map((feedBox) => ({
        ...feedBox.ref,
        feeds: feedBox
          .feeds
          .toRefArray()
          .sort((a, b) => a.index - b.index),
        colors: getColors(feedBox.hue, lightness, saturation),
      }))
  }
)

export default {
  getFeedBoxes,
}
