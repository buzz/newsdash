import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createReducer } from 'redux-orm'
import createSagaMiddleware from 'redux-saga'
import throttle from 'lodash.throttle'

import orm from './orm'
import defaultInitialState from './defaultInitialState'
import rootSaga from '../sagas'
import { loadState, saveState } from './localStorage'

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
    loadState() || defaultInitialState(),
    bindMiddleware([sagaMiddleware])
  )
  store.sagaTask = sagaMiddleware.run(rootSaga)
  store.subscribe(
    throttle(() => {
      saveState(store.getState())
    }, 1000)
  )
  return store
}

export default makeStore
