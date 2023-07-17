import type { NotificationProps as MantineNotificationProps } from '@mantine/notifications'
import { IconCloudDataConnection, IconWorldBolt } from '@tabler/icons-react'

import type { Notification } from '#types/types'

type NotificationProps = Omit<MantineNotificationProps, 'id' | 'onClose' | 'onOpen'>

export const notificationTypes: Record<string, NotificationProps> = {
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

function getNotificationProps(notification: Notification) {
  return {
    id: notification.id,
    autoClose: 5000,
    ...notificationTypes[notification.type],
  }
}

export default getNotificationProps
