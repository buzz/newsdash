import { MantineProvider } from '@mantine/core'
import { Provider as ReduxProvider } from 'react-redux'

import Dock from '#ui/components/Dock/Dock'
import type { Store } from '#store/types'

import AppShell from './AppShell'
import Notifications from './notifications/Notifications'
import theme, { resolver } from './theme'

function App({ store }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <MantineProvider cssVariablesResolver={resolver} defaultColorScheme="auto" theme={theme}>
        <Notifications />
        <AppShell>
          <Dock />
        </AppShell>
      </MantineProvider>
    </ReduxProvider>
  )
}

interface AppProps {
  store: Store
}

export default App
