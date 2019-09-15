import { createSelector } from 'redux-orm'

import orm from 'newsdash/store/orm'
import getOrm from './orm'

const getApp = createSelector(
  orm, getOrm,
  (session) => session.App.first().ref
)

export default getApp
