import { Provider as ReduxProvider } from 'react-redux'

import type { Store } from '#store/types'
import type { ColorSchemeMode } from '#types/types'
import Dock from '#ui/components/Dock/DockWrapper'

import AppShell from './AppShell'
import Notifications from './notifications/Notifications'
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
