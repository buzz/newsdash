import { Notifications } from '@mantine/notifications'
import { Provider as ReduxProvider } from 'react-redux'

import type { Store } from '#store/makeStore'
import type { ColorSchemeMode } from '#types/types'
import Dock from '#ui/components/Dock/Dock'

import AppShell from './AppShell'
import ThemeProvider from './ThemeProvider'

function App({ earlyColorSchemeMode, store }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider earlyColorSchemeMode={earlyColorSchemeMode}>
        <Notifications />
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
