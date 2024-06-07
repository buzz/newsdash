import type { NotificationData } from '@mantine/notifications'
import { IconCloudDataConnection, IconWorldBolt } from '@tabler/icons-react'

import type { Notification } from '#types/types'

export const notificationTypes: Record<string, NotificationData> = {
  disconnect: {
    autoClose: false,
    color: 'red',
    icon: <IconWorldBolt />,
    message: 'The backend server is not reachable.',
    title: 'No connection!',
    withCloseButton: false,
  },

  reconnect: {
    color: 'green',
    icon: <IconCloudDataConnection />,
    message: 'The connection has been re-established.',
    title: 'Back online',
  },
}

function getNotificationData(notification: Notification): NotificationData {
  return {
    id: notification.id,
    autoClose: 5000,
    ...notificationTypes[notification.type],
  }
}

export default getNotificationData
