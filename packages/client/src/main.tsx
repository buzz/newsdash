import React from 'react'
import ReactDOM from 'react-dom/client'

import makeStore from '#store/makeStore.ts'
import { appInit } from '#store/slices/app/actions'
import App from '#ui/components/App/App.tsx'
import { earlyColorSchemeMode } from '#utils'

const colorSchemeMode = earlyColorSchemeMode() // Do first to prevent FART

const rootElem = document.getElementById('root')

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
