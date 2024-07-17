import { isError } from 'lodash-es'

import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'

import { extractQueryError, fromPersistLayout } from '#store/middleware/utils'
import layoutApi from '#store/slices/api/layoutApi'
import { restoreLayout as restoreLayoutAction } from '#store/slices/layout/actions'
import { showNotification } from '#store/slices/notifications/actions'
import type { AppListenerEffectAPI } from '#store/middleware/types'

/** Restore layout from server */
async function restoreLayout(listenerApi: AppListenerEffectAPI) {
  try {
    const getLayout = layoutApi.endpoints.getLayout.initiate()
    const { isError: isQueryError, error, isSuccess, data } = await listenerApi.dispatch(getLayout)

    if (isQueryError) {
      throw new Error(extractQueryError(error))
    } else if (isSuccess) {
      listenerApi.dispatch(restoreLayoutAction(fromPersistLayout(data)))
    }
  } catch (error) {
    listenerApi.dispatch(
      showNotification({
        title: 'Failed to load layout',
        message: isError(error) ? error.message : UNKNOWN_ERROR_MESSAGE,
        type: 'error',
      })
    )
  }
}

export default restoreLayout
