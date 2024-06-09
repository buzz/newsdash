import {
  Notifications as MantineNotifications,
  notifications as mantineNotifications,
} from '@mantine/notifications'
import { IconCloudDataConnection, IconWorldBolt } from '@tabler/icons-react'
import { useEffect } from 'react'
import type { NotificationData } from '@mantine/notifications'

import { notificationProcessed } from '#store/slices/notifications/actions'
import notificationsSelectors from '#store/slices/notifications/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'

const icons: Record<string, JSX.Element> = {
  'connection-error': <IconWorldBolt />,
  reconnect: <IconCloudDataConnection />,
}

function addIcon(data: NotificationData): NotificationData {
  const dataWithIcon = { ...data }
  if (typeof data.icon === 'string') {
    dataWithIcon.icon = icons[data.icon]
  }
  return dataWithIcon
}

function Notifications() {
  const dispatch = useDispatch()
  const storeNotifications = useSelector(notificationsSelectors.selectAll)

  // Pass notifications one-by-one to Mantine system
  useEffect(() => {
    for (const notification of storeNotifications) {
      try {
        if (notification.command === 'show' && notification.data) {
          mantineNotifications.show(addIcon(notification.data))
        } else if (notification.command === 'hide') {
          mantineNotifications.hide(notification.id)
        }
      } finally {
        dispatch(notificationProcessed(notification.id))
      }
    }
  }, [dispatch, storeNotifications])

  return <MantineNotifications />
}

export default Notifications
