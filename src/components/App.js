import React, { useState } from 'react'
import { Provider } from 'react-redux'
import Modal from 'react-modal'

import '../style/index.sass'
import modalCss from './Modal.sass'
import makeStore from '../store'
import ControlBar from './ControlBar'
import NewsGrid from './NewsGrid'
import Settings from './Settings'

const store = makeStore()

Modal.setAppElement('#root')

const App = () => {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <Provider store={store}>
      <ControlBar setShowSettings={setShowSettings} />
      <NewsGrid />
      <Modal
        className={modalCss.modal}
        contentLabel="Settings"
        isOpen={showSettings}
        onRequestClose={() => setShowSettings(false)}
        overlayClassName={modalCss.overlay}
      >
        <Settings setShowSettings={setShowSettings} />
      </Modal>
    </Provider>
  )
}

export default App
