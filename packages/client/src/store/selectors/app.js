import { createSelector } from 'redux-orm'

import orm from 'newsdash/store/orm'

const getApp = createSelector(orm, (session) => session.App.first().ref)

export default getApp
