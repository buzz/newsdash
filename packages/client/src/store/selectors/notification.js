import { createSelector } from 'redux-orm'

import orm from 'newsdash/store/orm'

const getNotifications = createSelector(orm, (session) =>
  session.Notification.all().toRefArray()
)

export default {
  getNotifications,
}
