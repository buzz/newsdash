import { createSelector } from 'redux-orm'

import orm from 'newsdash/store/orm'
import getOrm from './orm'

const getNotifications = createSelector(
  orm, getOrm,
  (session) => session
    .Notification
    .all()
    .toRefArray()
)

export default {
  getNotifications,
}
