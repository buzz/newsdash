// import { useLocalStorage } from '@mantine/hooks'
import { Provider as ReduxProvider } from 'react-redux'

import type { Store } from '#store/makeStore'
import type { ColorSchemeMode } from '#types/types'
import Dock from '#ui/components/Dock/Dock'

import AppShell from './AppShell'
import ThemeProvider from './ThemeProvider'

function App({ earlyColorSchemeMode, store }: AppProps) {
  // const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
  //   key: 'newsdash-color-scheme',
  //   defaultValue: 'system',
  //   getInitialValueInEffect: true,
  // })

  return (
    <ReduxProvider store={store}>
      <ThemeProvider earlyColorSchemeMode={earlyColorSchemeMode}>
        <AppShell>
          <Dock />
        </AppShell>
      </ThemeProvider>
    </ReduxProvider>
  )
}

interface AppProps {
  earlyColorSchemeMode: ColorSchemeMode
  store: Store
}

export default App
