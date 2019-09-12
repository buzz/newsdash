import { call, select } from 'redux-saga/effects'

import trailingThrottle from '../trailingThrottle'
import { save } from '../../store/localStorage'
import getOrm from '../../store/selectors/orm'

function* saveStateSaga() {
  yield call(save, 'orm', yield select(getOrm))
}

export default function* continuouslySaveStateSaga() {
  yield trailingThrottle(1000, '*', saveStateSaga)
}
