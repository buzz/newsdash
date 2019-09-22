import { call, takeEvery } from 'redux-saga/effects'

import { actionTypes as appActionTypes } from 'newsdash/store/actions/app'
import continuouslySaveSettingsSaga from './continuouslySaveSettingsSaga'
import importSettingsSaga from './importSettingsSaga'

export default [
  takeEvery(appActionTypes.IMPORT_SETTINGS, importSettingsSaga),
  call(continuouslySaveSettingsSaga),
]
