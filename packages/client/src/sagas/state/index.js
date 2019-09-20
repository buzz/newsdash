import { call } from 'redux-saga/effects'

import continuouslySaveStateSaga from './continuouslySaveStateSaga'

export default [
  call(continuouslySaveStateSaga),
]
