import { call, takeEvery } from 'redux-saga/effects'

import { actionTypes as appActionTypes } from 'newsdash/store/actions/app'
import continuouslySaveStateSaga from './continuouslySaveStateSaga'
import importStateSaga from './importStateSaga'

export default [
  takeEvery(appActionTypes.IMPORT_STATE, importStateSaga),
  call(continuouslySaveStateSaga),
]
