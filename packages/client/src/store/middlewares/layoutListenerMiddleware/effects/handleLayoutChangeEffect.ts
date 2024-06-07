import { handleLayoutChange, updateLayout } from '#store/slices/layout/actions'
import { globalizedBoxesSelectors } from '#store/slices/layout/entities/boxes/selectors'
import { globalizedPanelsSelectors } from '#store/slices/layout/entities/panels/selectors'
import { globalizedTabsSelectors } from '#store/slices/layout/entities/tabs/selectors'
import LayoutNormalizer from '#store/utils/LayoutNormalizer'
import type { AppStartListening } from '#store/middlewares/types'

/**
 * Handle update from rc-dock component
 *
 * Normalize and collect entities for bulk upsert, delete others from store.
 * */
function handleLayoutChangeEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: handleLayoutChange,
    effect: ({ payload: layout }, listenerApi) => {
      // Get present IDs from store
      const boxIds = globalizedBoxesSelectors.selectIds(listenerApi.getState())
      const panelIds = globalizedPanelsSelectors.selectIds(listenerApi.getState())
      const tabIds = globalizedTabsSelectors.selectIds(listenerApi.getState())

      // Normalize layout entities
      const normalizer = new LayoutNormalizer(layout, boxIds, panelIds, tabIds)
      const normalizedLayout = normalizer.normalizeLayout()

      // Send update to store
      listenerApi.dispatch(updateLayout(normalizedLayout))
    },
  })
}

export default handleLayoutChangeEffect
