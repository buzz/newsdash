import React, { useState } from 'react'
import { Provider } from 'react-redux'

import makeStore from 'newsdash/store'
import ControlBar from './ControlBar'
import Modal from './Modal'
import NewsGrid from './NewsGrid'
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
    </Provider>
  )
}

export default App
