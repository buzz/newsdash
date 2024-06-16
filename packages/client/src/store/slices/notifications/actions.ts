import { nanoid } from 'nanoid'

import type { NotificationShow } from '#types/types'

import notificationsSlice from './notificationsSlice'

/** Request creation of new notification */
const showNotification = notificationsSlice.createAction(
  'showErrorNotification',
  (data: NotificationShow['data']) => ({
    payload: {
      id: nanoid(),
      command: 'show' as const,
      data,
    },
  })
)

/** Hide a notification in Mantine notification system */
const hideNotification = notificationsSlice.createAction<string>('hideNotification')

/** Signal notification has been passed to Mantine notification system */
const notificationProcessed = notificationsSlice.createAction<string>('notificationProcessed')

export { hideNotification, notificationProcessed, showNotification }
