import { nanoid } from 'nanoid'
import type { NotificationData } from '@mantine/notifications'

import notificationsSlice from './notificationsSlice'

const AUTO_CLOSE_DEFAULT = 10_000

/** Request creation of new notification */
const showNotification = notificationsSlice.createAction(
  'showNotification',
  (data: NotificationData) => ({
    payload: {
      id: nanoid(),
      command: 'show' as const,
      data: {
        autoClose: AUTO_CLOSE_DEFAULT,
        ...data,
      },
    },
  })
)

/** Hide a notification in Mantine notification system */
const hideNotification = notificationsSlice.createAction<string>('hideNotification')

/** Signal notification has been passed to Mantine notification system */
const notificationProcessed = notificationsSlice.createAction<string>('notificationProcessed')

export { hideNotification, notificationProcessed, showNotification }
