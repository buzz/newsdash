import type { ColorScheme, MantineThemeOverride } from '@mantine/styles'

import makeRcDockTheme from './makeRcDockTheme'

function makeTheme(colorScheme: ColorScheme): MantineThemeOverride {
  const other = {
    transition: {
      duration: {
        default: 250,
        fast: 100,
      },
    },
  }

  const rcDockTheme = makeRcDockTheme(colorScheme, other)

  const customTheme = {
    colorScheme,
    globalStyles: () => ({
      'body, html': { overflow: 'hidden' },
      ...rcDockTheme,
    }),
    other,
  }

  return customTheme
}

export default makeTheme
