import React, { useEffect } from 'react'
import RcNotification from 'rc-notification'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { NOTIFICATION_DURATION } from 'newsdash/constants'
import { notificationShown } from 'newsdash/store/actions/notification'
import notificationSelectors from 'newsdash/store/selectors/notification'
import Notification from './Notification'
import css from './Notification.sss'

let notice = null
RcNotification.newInstance(
  {
    closeIcon: <FontAwesomeIcon icon={faTimes} />,
    prefixCls: css.notificationContainer,
    style: {},
  },
  (RcNotificationInstance) => {
    notice = RcNotificationInstance.notice
  }
)

const NotificationManager = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(notificationSelectors.getNotifications)

  useEffect(() => {
    if (notice) {
      notifications.forEach(
        (notification) => {
          notice({
            closable: true,
            content: (
              <Notification
                message={notification.message}
                title={notification.title}
                type={notification.type}
              />
            ),
            duration: NOTIFICATION_DURATION / 1000,
            key: notification.id.toString(),
            style: {},
          })
          dispatch(notificationShown(notification.id))
        }
      )
    }
  }, [dispatch, notifications])

  return null
}

export default NotificationManager
