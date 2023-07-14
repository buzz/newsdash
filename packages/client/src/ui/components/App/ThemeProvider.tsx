import { type ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useEffect, type ReactNode } from 'react'

import { changeColorSchemeMode, selectColorSchemeMode } from '#store/slices/settingsSlice'
import type { ColorSchemeMode } from '#types/types'
import { useDispatch, useSelector } from '#ui/hooks/store'
import theme from '#ui/theme'
import { colorSchemeFromMode } from '#utils'

function ThemeProvider({ children, earlyColorSchemeMode }: ThemeProviderProps) {
  const dispatch = useDispatch()
  const storeColorSchemeMode = useSelector(selectColorSchemeMode)

  const toggleColorScheme = (value?: ColorScheme) => {
    dispatch(changeColorSchemeMode(value || (colorScheme === 'dark' ? 'light' : 'dark')))
  }

  // Pass early color scheme mode to store
  useEffect(() => {
    dispatch(changeColorSchemeMode(earlyColorSchemeMode))
  }, [dispatch, earlyColorSchemeMode])

  const colorSchemeMode = storeColorSchemeMode ?? earlyColorSchemeMode
  const colorScheme = colorSchemeFromMode(colorSchemeMode)

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ ...theme, colorScheme }}
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

interface ThemeProviderProps {
  children: ReactNode
  earlyColorSchemeMode: ColorSchemeMode
}

export default ThemeProvider
