import {
  Notifications as MantineNotifications,
  notifications as mantineNotifications,
} from '@mantine/notifications'
import { IconCheck, IconExclamationMark, IconInfoCircle } from '@tabler/icons-react'
import { useEffect } from 'react'
import type { NotificationData as MantineNotificationData } from '@mantine/notifications'

import { notificationProcessed } from '#store/slices/notifications/actions'
import notificationsSelectors from '#store/slices/notifications/selectors'
import { isNotificationShow } from '#types/typeGuards'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { NotificationShow } from '#types/types'

const AUTO_CLOSE = 10_000

function toMantineNotification(data: NotificationShow['data']): MantineNotificationData {
  switch (data.type) {
    case 'error': {
      return {
        autoClose: AUTO_CLOSE,
        color: 'red',
        icon: <IconExclamationMark />,
        message: `Error: ${data.message}`,
        title: data.title,
      }
    }
    case 'success': {
      return {
        autoClose: AUTO_CLOSE,
        color: 'green',
        icon: <IconCheck />,
        message: data.message,
        title: data.title,
      }
    }
    default: {
      return {
        autoClose: AUTO_CLOSE,
        icon: <IconInfoCircle />,
        message: data.message,
        title: data.title,
      }
    }
  }
}

function Notifications() {
  const dispatch = useDispatch()
  const storeNotifications = useSelector(notificationsSelectors.selectAll)

  // Pass notifications one-by-one to Mantine system
  useEffect(() => {
    for (const notification of storeNotifications) {
      try {
        if (isNotificationShow(notification)) {
          mantineNotifications.show(toMantineNotification(notification.data))
        } else {
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
