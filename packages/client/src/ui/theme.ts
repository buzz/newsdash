import type { MantineThemeOverride } from '@mantine/styles'

const theme: MantineThemeOverride = {
  globalStyles: () => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    'body, html, #root': {
      height: '100%',
      overflow: 'hidden',
    },
  }),
}

export default theme
