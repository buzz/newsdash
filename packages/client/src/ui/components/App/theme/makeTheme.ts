import type { ColorScheme, MantineThemeOverride } from '@mantine/styles'

import makeRcDockTheme from './makeRcDockTheme'

function makeTheme(colorScheme: ColorScheme): MantineThemeOverride {
  const rcDockTheme = makeRcDockTheme(colorScheme, (...args) =>
    colorScheme === 'dark' ? args[0] : args[1]
  )

  return {
    colorScheme,
    globalStyles: () => ({
      'body, html': { overflow: 'hidden' },
      ...rcDockTheme,
    }),
  }
}

export default makeTheme
