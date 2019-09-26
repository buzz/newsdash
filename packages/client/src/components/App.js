import React, { useState } from 'react'
import { Provider } from 'react-redux'
import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/native-loading/ls.native-loading'

import makeStore from 'newsdash/store'
import About from './About'
import ControlBar from './ControlBar'
import Modal from './Modal'
import NewsGrid from './NewsGrid'
import NotificationManager from './NotificationManager'
import Settings from './Settings'
import 'newsdash/style/index.sss'

const store = makeStore()

const App = () => {
  const [showModal, setShowModal] = useState(false)

  let modalContent = null
  if (showModal === 'about') {
    modalContent = <About setShowModal={setShowModal} />
  } else if (showModal === 'settings') {
    modalContent = <Settings setShowModal={setShowModal} />
  }

  return (
    <Provider store={store}>
      <ControlBar setShowModal={setShowModal} />
      <NewsGrid />
      <Modal
        contentLabel="Settings"
        isOpen={showModal !== false}
        onRequestClose={() => setShowModal(false)}
      >
        {modalContent}
      </Modal>
      <NotificationManager />
    </Provider>
  )
}

export default App
