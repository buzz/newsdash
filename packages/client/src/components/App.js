import React, { useState } from 'react'
import { Provider } from 'react-redux'
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/native-loading/ls.native-loading'

import makeStore from 'newsdash/store'
import ControlBar from './ControlBar'
import Modal from './Modal'
import NewsGrid from './NewsGrid'
import NotificationManager from './NotificationManager'
import Settings from './Settings'
import 'newsdash/style/index.sass'

const store = makeStore()

const App = () => {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <Provider store={store}>
      <ControlBar setShowSettings={setShowSettings} />
      <NewsGrid />
      <Modal
        contentLabel="Settings"
        isOpen={showSettings}
        onRequestClose={() => setShowSettings(false)}
      >
        <Settings setShowSettings={setShowSettings} />
      </Modal>
      <NotificationManager />
    </Provider>
  )
}

export default App
