import { rcLayoutChange, updateLayout } from '#store/slices/layout/actions'
import selectLayoutUpdate from '#store/slices/layout/selectors/selectLayoutUpdate'
import type { AppStartListening } from '#store/middlewares/types'

/**
 * Handle update from rc-dock component.
 *
 * Create normalized layout update and pass to reducer.
 */
function rcLayoutChangeEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: rcLayoutChange,
    effect: ({ payload: layout }, listenerApi) => {
      const update = selectLayoutUpdate(listenerApi.getState(), layout)
      listenerApi.dispatch(updateLayout(update))
    },
  })
}

export default rcLayoutChangeEffect
