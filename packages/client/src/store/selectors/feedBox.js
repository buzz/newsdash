import { createSelector } from 'redux-orm'
import tinycolor from 'tinycolor2'

import orm from 'newsdash/store/orm'

const cloneDarken = (baseColor, amount) =>
  baseColor.clone().darken(amount).toHexString()

const getColors = (hue, lightness, saturation) => {
  const baseColor = tinycolor({ h: hue, s: 1.0, l: 0.5 })
    .desaturate(100 - saturation)
    .lighten(25 + 25 * (lightness / 100))
  return {
    bg: baseColor.toHexString(),
    border: cloneDarken(baseColor, 20),
    headerBg: cloneDarken(baseColor, 9),
    tabsBg: cloneDarken(baseColor, 4),
  }
}

const getFeedBoxes = createSelector(orm, (session) => {
  const { lightness, saturation } = session.App.first().ref
  return session.FeedBox.all()
    .toModelArray()
    .map((feedBox) => ({
      ...feedBox.ref,
      feeds: feedBox.feeds.toRefArray().sort((a, b) => a.index - b.index),
      colors: getColors(feedBox.hue, lightness, saturation),
    }))
})

export default {
  getFeedBoxes,
}
