import React from 'react'
import { Provider } from 'react-redux'

import makeStore from '../store'
import ControlBar from './ControlBar'
import NewsGrid from './NewsGrid'

const store = makeStore()

const App = () => (
  <Provider store={store}>
    <ControlBar />
    <NewsGrid />
  </Provider>
)

export default App
