import { createTheme, rem } from '@mantine/core'
import type { CSSVariablesResolver } from '@mantine/core'

import { IMG_AR, IMG_WIDTH } from '@newsdash/common/constants'

import { DISPLAY_PARAMS } from '#constants'

const theme = createTheme({
  other: {
    transition: {
      duration: {
        default: 250,
        short: 100,
        extraShort: 50,
      },
      timingFunction: 'ease',
    },
  },
})

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--text-color-bright': '#eee',
    '--transition-duration': `${theme.other.transition.duration.default}ms`,
    '--transition-duration-short': `${theme.other.transition.duration.short}ms`,
    '--transition-duration-extra-short': `${theme.other.transition.duration.extraShort}ms`,
    '--transition-timing-function': theme.other.transition.timingFunction,
    '--feed-item-detail-height': `${DISPLAY_PARAMS.detailed.height}px`,
    '--feed-item-image-width': rem(IMG_WIDTH),
    '--feed-item-image-ar': String(IMG_AR),
  },
  dark: {},
  light: {},
})

export { resolver }
export default theme
