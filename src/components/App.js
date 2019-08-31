import React from 'react'
import { Provider } from 'react-redux'
import makeStore from '../store'

import NewsGrid from './NewsGrid'

const store = makeStore()

const App = () => (
  <Provider store={store}>
    <NewsGrid />
  </Provider>
)

export default App
