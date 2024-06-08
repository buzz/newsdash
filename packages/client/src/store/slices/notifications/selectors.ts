import type { RootState } from '#store/types'

import notificationsEntityAdapter from './notificationsEntityAdapter'

/** Adapter selectors */
const notificationsSelectors = notificationsEntityAdapter.getSelectors(
  (state: RootState) => state.notifications
)

export default notificationsSelectors
