import { createSelector } from '@reduxjs/toolkit'

import { selectPersistBoxes } from '#store/slices/layout/entities/boxes/selectors'
import { selectPersistPanels } from '#store/slices/layout/entities/panels/selectors'
import { selectPersistTabs } from '#store/slices/layout/entities/tabs/selectors'

/** Select layout for persisting */
const selectPersistLayout = createSelector(
  [selectPersistBoxes, selectPersistPanels, selectPersistTabs],
  (boxes, panels, tabs) => ({ boxes, panels, tabs })
)

export { selectPersistLayout }
