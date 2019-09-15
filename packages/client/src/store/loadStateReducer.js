import { actionTypes as appActionTypes } from './actions/app'

const loadStateReducer = (state, action) => (
  action.type === appActionTypes.LOAD_STATE
    ? action.orm
    : state
)

export default loadStateReducer
