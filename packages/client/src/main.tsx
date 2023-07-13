import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './ui/components/App.tsx'

const rootElem = document.getElementById('root')

if (rootElem === null) {
  throw new Error('Could not find root element!')
}

ReactDOM.createRoot(rootElem).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
