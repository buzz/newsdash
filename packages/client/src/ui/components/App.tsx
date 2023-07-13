import { MantineProvider } from '@mantine/core'
import { Provider as ReduxProvider } from 'react-redux'

import makeStore from '#store/makeStore'
import theme from '#ui/theme'

import DockBox from './Dock/DockBox'

const store = makeStore()

function App() {
  return (
    <ReduxProvider store={store}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <DockBox />
      </MantineProvider>
    </ReduxProvider>
  )
}

export default App
