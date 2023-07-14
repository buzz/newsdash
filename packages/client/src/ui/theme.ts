import type { MantineThemeOverride } from '@mantine/styles'

const theme: MantineThemeOverride = {
  globalStyles: () => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
  }),
}

export default theme
