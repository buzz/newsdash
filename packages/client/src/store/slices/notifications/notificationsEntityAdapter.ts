import { createEntityAdapter } from '@reduxjs/toolkit'

import type { Notification } from '#types/types'

const notificationsEntityAdapter = createEntityAdapter<Notification>()

const notificationsInitialState = notificationsEntityAdapter.getInitialState()

export { notificationsInitialState }
export default notificationsEntityAdapter
