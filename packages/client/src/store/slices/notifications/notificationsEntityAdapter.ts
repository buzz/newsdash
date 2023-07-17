import { createEntityAdapter } from '@reduxjs/toolkit'

import type { Notification } from '#types/types'

const notificationsEntityAdapter = createEntityAdapter<Notification>()

export const notificationsInitialState = notificationsEntityAdapter.getInitialState()

export default notificationsEntityAdapter
