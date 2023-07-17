import type { RootState } from '#store/types'

import notificationsEntityAdapter from './notificationsEntityAdapter'

/** Adapter selectors */
const globalizedSelectors = notificationsEntityAdapter.getSelectors(
  (state: RootState) => state.notifications
)

export { globalizedSelectors as globalizedNotificationsSelectors }
