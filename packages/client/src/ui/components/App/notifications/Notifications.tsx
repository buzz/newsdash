import { Notifications as MantineNotifications, notifications } from '@mantine/notifications'
import { useEffect } from 'react'

import { notificationProcessed } from '#store/slices/notifications/actions'
import { globalizedNotificationsSelectors } from '#store/slices/notifications/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'

import getNotificationProps from './getNotificationProps'

function Notifications() {
  const dispatch = useDispatch()
  const storeNotifications = useSelector(globalizedNotificationsSelectors.selectAll)

  useEffect(() => {
    for (const notification of storeNotifications) {
      if (notification.instruction === 'hide') {
        // hide
        notifications.hide(notification.id)
      } else {
        // show
        notifications.show(getNotificationProps(notification))
      }
      dispatch(notificationProcessed(notification.id))
    }
  }, [dispatch, storeNotifications])

  return <MantineNotifications />
}

export default Notifications
