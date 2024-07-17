import { isError } from 'lodash-es'

import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'

import { extractQueryError, fromPersistLayout } from '#store/middlewares/utils'
import layoutApi from '#store/slices/api/layoutApi'
import { init } from '#store/slices/app/actions'
import { layoutRestored, restoreLayout } from '#store/slices/layout/actions'
import { showNotification } from '#store/slices/notifications/actions'
import type { AppStartListening } from '#store/middlewares/types'

/** Restore layout from server */
function restoreLayoutEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: init,
    effect: async (action, listenerApi) => {
      listenerApi.unsubscribe()

      try {
        const getLayout = layoutApi.endpoints.getLayout.initiate()
        const {
          isError: isQueryError,
          error,
          isSuccess,
          data,
        } = await listenerApi.dispatch(getLayout)

        if (isQueryError) {
          throw new Error(extractQueryError(error))
        } else if (isSuccess) {
          listenerApi.dispatch(restoreLayout(fromPersistLayout(data)))
        }
      } catch (error) {
        listenerApi.dispatch(
          showNotification({
            title: 'Failed to load layout',
            message: isError(error) ? error.message : UNKNOWN_ERROR_MESSAGE,
            type: 'error',
          })
        )
      } finally {
        listenerApi.dispatch(layoutRestored())
      }
    },
  })
}

export default restoreLayoutEffect
