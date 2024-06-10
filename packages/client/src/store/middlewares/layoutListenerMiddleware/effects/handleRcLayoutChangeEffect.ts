import { rcLayoutChange, updateLayout } from '#store/slices/layout/actions'
import { selectNormalizedLayout } from '#store/slices/layout/selectors'
import type { AppStartListening } from '#store/middlewares/types'

/**
 * Handle update from rc-dock component.
 *
 * Normalize layout and pass to reducer.
 */
function handleRcLayoutChangeEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: rcLayoutChange,
    effect: ({ payload: layout }, listenerApi) => {
      const normalizedLayout = selectNormalizedLayout(listenerApi.getState(), layout)
      listenerApi.dispatch(updateLayout(normalizedLayout))
    },
  })
}

export default handleRcLayoutChangeEffect
