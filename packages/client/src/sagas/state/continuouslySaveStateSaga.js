import { call, select } from 'redux-saga/effects'

import trailingThrottle from 'newsdash/sagas/trailingThrottle'
import { save } from 'newsdash/store/localStorage'
import getOrm from 'newsdash/store/selectors/orm'

function* saveStateSaga() {
  yield call(save, 'orm', yield select(getOrm))
}

export default function* continuouslySaveStateSaga() {
  yield trailingThrottle(1000, '*', saveStateSaga)
}
