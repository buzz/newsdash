import { createTheme, type CSSVariablesResolver } from '@mantine/core'

const theme = createTheme({
  other: {
    transition: {
      duration: {
        default: 250,
        short: 100,
      },
      timingFunction: 'ease',
    },
  },
})

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--transition-duration': `${theme.other.transition.duration.default}ms`,
    '--transition-duration-short': `${theme.other.transition.duration.short}ms`,
    '--transition-timing-function': theme.other.transition.timingFunction,
  },
  dark: {},
  light: {},
})

export { resolver }
export default theme
