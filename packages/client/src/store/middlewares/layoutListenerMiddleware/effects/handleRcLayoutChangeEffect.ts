import { rcLayoutChange, updateLayout } from '#store/slices/layout/actions'
import boxesSelectors from '#store/slices/layout/entities/boxes/selectors'
import panelsSelectors from '#store/slices/layout/entities/panels/selectors'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import LayoutNormalizer from '#store/utils/LayoutNormalizer'
import type { AppStartListening } from '#store/middlewares/types'

/**
 * Handle update from rc-dock component
 *
 * Normalize and collect entities for bulk upsert, delete others from store.
 * */
function handleRcLayoutChangeEffect(startListening: AppStartListening) {
  startListening({
    actionCreator: rcLayoutChange,
    effect: ({ payload: layout }, listenerApi) => {
      // Get present IDs from store
      const boxIds = boxesSelectors.selectIds(listenerApi.getState())
      const panelIds = panelsSelectors.selectIds(listenerApi.getState())
      const tabIds = tabsSelectors.selectIds(listenerApi.getState())

      // Normalize layout entities
      const normalizer = new LayoutNormalizer(layout, boxIds, panelIds, tabIds)
      const normalizedLayout = normalizer.normalizeLayout()

      // Send update to store
      listenerApi.dispatch(updateLayout(normalizedLayout))
    },
  })
}

export default handleRcLayoutChangeEffect
