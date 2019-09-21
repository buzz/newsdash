import { Model, attr } from 'redux-orm'

import { NOTIFICATION_TYPES } from 'newsdash/constants'
import { actionTypes as notificationActionTypes } from 'newsdash/store/actions/notification'

export default class Notification extends Model {
  static get modelName() {
    return 'Notification'
  }

  static get fields() {
    return {
      id: attr(),
      message: attr(),
      title: attr(),
      type: attr({ getDefault: () => NOTIFICATION_TYPES.NORMAL }),
    }
  }

  static reducer(action, notificationModel) {
    switch (action.type) {
      case notificationActionTypes.NOTIFICATION_SHOWN:
        notificationModel.withId(action.id).delete()
        break
      case notificationActionTypes.SHOW_NOTIFICATION:
        notificationModel.create(action.notification)
        break
      default:
        break
    }
  }
}
