import { nanoid } from 'nanoid'

import notificationsSlice from './notificationsSlice'

/** Request creation of new notification */
export const showNotification = notificationsSlice.createAction(
  'showNotification',
  (type: string) => ({
    payload: { id: nanoid(), type },
  })
)

/** Hide a notification in Mantine notification system */
export const hideNotification = notificationsSlice.createAction<string>('hideNotification')

/** Signal notification has been passed to Mantine notification system */
export const notificationProcessed =
  notificationsSlice.createAction<string>('notificationProcessed')
