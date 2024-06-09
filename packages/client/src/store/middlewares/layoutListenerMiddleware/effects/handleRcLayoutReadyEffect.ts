import { EMPTY_LAYOUT } from '#constants'
import state from '#store/slices/api/state'
import { loadedInitialState } from '#store/slices/app/actions'
import { rcLayoutReady, restoreLayout, updateLayout } from '#store/slices/layout/actions'
import { selectNormalizedLayout } from '#store/slices/layout/selectors'
import { showNotification } from '#store/slices/notifications/actions'
import { updateSettings } from '#store/slices/settings/actions'
import type { AppStartListening } from '#store/middlewares/types'

/**
 * Handle rc-dock ready action.
 *
 * Initialize with server data or empty layout.
 */
function handleRcLayoutReadyEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: rcLayoutReady,
    effect: async (action, listenerApi) => {
      const getState = state.endpoints.getState.initiate()
      const { isSuccess, data } = await listenerApi.dispatch(getState)

      if (isSuccess) {
        const { settings, ...entities } = data
        if (settings) {
          listenerApi.dispatch(updateSettings(settings))
        }
        if (entities.tabs.length > 0) {
          listenerApi.dispatch(restoreLayout(entities))
        } else {
          const normalizedLayout = selectNormalizedLayout(listenerApi.getState(), EMPTY_LAYOUT)
          listenerApi.dispatch(updateLayout(normalizedLayout))
        }
        listenerApi.dispatch(loadedInitialState())
      } else {
        listenerApi.dispatch(
          showNotification({
            autoClose: false,
            color: 'red',
            icon: 'connection-error',
            message: 'The backend server is not reachable.',
            title: 'No connection!',
            withCloseButton: false,
          })
        )
      }

      listenerApi.unsubscribe()
    },
  })
}

export default handleRcLayoutReadyEffect
