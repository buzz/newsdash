import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createReducer } from 'redux-orm'
import createSagaMiddleware from 'redux-saga'

import rootSaga from 'newsdash/sagas'
import orm from './orm'
import defaultInitialState from './defaultInitialState'

// add redux devtools
const bindMiddleware = (middleware) => {
  let boundMiddleware = applyMiddleware(...middleware)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const { composeWithDevTools } = require('redux-devtools-extension')
    boundMiddleware = composeWithDevTools(boundMiddleware)
  }
  return boundMiddleware
}

// create store and run root saga
const makeStore = () => {
  const rootReducer = combineReducers({ orm: createReducer(orm) })
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    defaultInitialState(),
    bindMiddleware([sagaMiddleware])
  )
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}

export default makeStore
