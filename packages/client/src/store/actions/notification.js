export const actionTypes = {
  NOTIFICATION_SHOWN: 'NOTIFICATION_SHOWN',
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
}

export const notificationShown = (id) => ({
  type: actionTypes.NOTIFICATION_SHOWN,
  id,
})

export const showNotification = (notification) => ({
  type: actionTypes.SHOW_NOTIFICATION,
  notification,
})
