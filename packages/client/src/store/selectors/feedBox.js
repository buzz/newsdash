import { createSelector } from 'redux-orm'
import tinycolor from 'tinycolor2'

import orm from 'newsdash/store/orm'
import selectId from './id'

const cloneDarken = (baseColor, amount) =>
  baseColor.clone().darken(amount).toHexString()

const cloneLighten = (baseColor, amount) =>
  baseColor.clone().lighten(amount).toHexString()

const getColors = (hue, lightness, saturation, theme) => {
  const baseColor = tinycolor({ h: hue, s: 1.0, l: 0.5 })
    .desaturate(100 - saturation)
    .lighten(25 + 25 * (lightness / 100))

  if (theme === 'dark') {
    baseColor.darken(65)
    return {
      bg: baseColor.toHexString(),
      border: cloneDarken(baseColor, 10),
      headerBg: cloneLighten(baseColor, 9),
      tabsBg: cloneLighten(baseColor, 4),
    }
  }

  return {
    bg: baseColor.toHexString(),
    border: cloneDarken(baseColor, 20),
    headerBg: cloneDarken(baseColor, 9),
    tabsBg: cloneDarken(baseColor, 4),
  }
}

const getFeedBoxes = createSelector(orm, selectId, (session, colorSchema) => {
  const { lightness, saturation } = session.App.first().ref

  return session.FeedBox.all()
    .toModelArray()
    .map((feedBox) => ({
      ...feedBox.ref,
      feeds: feedBox.feeds.toRefArray().sort((a, b) => a.index - b.index),
      colors: getColors(feedBox.hue, lightness, saturation, colorSchema),
    }))
})

export default {
  getFeedBoxes,
}
