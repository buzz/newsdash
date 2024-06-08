import type { NotificationData } from '@mantine/notifications'
import {
  Notifications as MantineNotifications,
  notifications as mantineNotifications,
} from '@mantine/notifications'
import { useEffect } from 'react'

import { notificationProcessed } from '#store/slices/notifications/actions'
import notificationsSelectors from '#store/slices/notifications/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { Notification, ShowNotification } from '#types/types'

import notificationTypes from './notificationTypes'

function isShowNotification(notification: Notification): notification is ShowNotification {
  return notification.instruction === 'show'
}

function getNotificationData(notification: ShowNotification): NotificationData {
  return {
    id: notification.id,
    autoClose: 5000,
    ...notificationTypes[notification.type],
  }
}

function Notifications() {
  const dispatch = useDispatch()
  const storeNotifications = useSelector(notificationsSelectors.selectAll)

  useEffect(() => {
    for (const notification of storeNotifications) {
      try {
        if (isShowNotification(notification)) {
          mantineNotifications.show(getNotificationData(notification))
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
