import React from 'react'
import ReactDOM from 'react-dom/client'

import makeStore from '#store/makeStore'
import { appInit } from '#store/slices/app/actions'
import App from '#ui/components/App/App'
import { earlyColorSchemeMode } from '#utils'

const colorSchemeMode = earlyColorSchemeMode() // Do first to prevent FART

const rootElem = document.querySelector('#root')

if (rootElem === null) {
  throw new Error('Could not find root element!')
}

const store = makeStore()
store.dispatch(appInit())

ReactDOM.createRoot(rootElem).render(
  <React.StrictMode>
    <App earlyColorSchemeMode={colorSchemeMode} store={store} />
  </React.StrictMode>
)
