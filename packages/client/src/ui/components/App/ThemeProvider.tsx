import { type ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { type ReactNode, useEffect, useMemo } from 'react'

import { changeColorSchemeMode } from '#store/slices/settings/actions'
import { selectColorSchemeMode } from '#store/slices/settings/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'
import { colorSchemeFromMode } from '#utils'
import type { ColorSchemeMode } from '#types/types'

import makeTheme from './theme/makeTheme'

function ThemeProvider({ children, earlyColorSchemeMode }: ThemeProviderProps) {
  const dispatch = useDispatch()
  const storeColorSchemeMode = useSelector(selectColorSchemeMode)

  // Pass early color scheme mode to store
  useEffect(() => {
    dispatch(changeColorSchemeMode(earlyColorSchemeMode))
  }, [dispatch, earlyColorSchemeMode])

  const colorSchemeMode = storeColorSchemeMode ?? earlyColorSchemeMode
  const colorScheme = colorSchemeFromMode(colorSchemeMode)
  const theme = useMemo(() => makeTheme(colorScheme), [colorScheme])

  const toggleColorScheme = (value?: ColorScheme) => {
    dispatch(changeColorSchemeMode(value || (colorScheme === 'dark' ? 'light' : 'dark')))
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme} withCSSVariables withGlobalStyles withNormalizeCSS>
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
