import { createSelector } from '@reduxjs/toolkit'

import boxesSelectors from '#store/slices/layout/entities/boxes/selectors'
import panelsSelectors from '#store/slices/layout/entities/panels/selectors'
import { selectPersistTabs } from '#store/slices/layout/entities/tabs/selectors'

/** Select layout for persisting */
const selectPersistLayout = createSelector(
  [boxesSelectors.selectAll, panelsSelectors.selectAll, selectPersistTabs],
  (boxes, panels, tabs) => ({ boxes, panels, tabs })
)

export { selectPersistLayout }
