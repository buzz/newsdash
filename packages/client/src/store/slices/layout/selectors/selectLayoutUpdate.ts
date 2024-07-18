import { createSelector } from '@reduxjs/toolkit'
import type { BoxData, LayoutBase, PanelData, TabData } from 'rc-dock'

import { layout } from '@newsdash/common/schema'

import { TAB_GROUP } from '#constants'
import boxesSelectors from '#store/slices/layout/entities/boxes/selectors'
import panelsSelectors from '#store/slices/layout/entities/panels/selectors'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { isBoxData, isPanelData } from '#types/typeGuards'
import type { UpdateLayoutPayload } from '#store/slices/layout/actions'
import type { RootState } from '#store/types'

function normalizeBoxData(
  state: RootState,
  update: UpdateLayoutPayloadSets,
  { children, ...boxData }: BoxData,
  order: number,
  parentId: string | null
) {
  if (!boxData.id) {
    throw new Error('Expected boxData ID')
  }

  const box = layout.boxSchema.parse({ ...boxData, order, parentId })
  update.entities.boxes.push(box)
  update.removeIds.boxIds.delete(boxData.id)

  for (const [i, child] of children.entries()) {
    if (isBoxData(child)) {
      normalizeBoxData(state, update, child, i, boxData.id)
    } else if (isPanelData(child)) {
      normalizePanelData(state, update, child, i, boxData.id)
    }
  }
}

function normalizePanelData(
  state: RootState,
  update: UpdateLayoutPayloadSets,
  { tabs: panelTabs, ...panelData }: PanelData,
  order: number,
  parentId: string
) {
  if (!panelData.id) {
    throw new Error('Expected panelData ID')
  }

  const panel = layout.panelSchema.parse({ group: TAB_GROUP, ...panelData, order, parentId })
  update.entities.panels.push(panel)
  update.removeIds.boxIds.delete(panelData.id)

  for (const [order, tabData] of panelTabs.entries()) {
    normalizeTabData(state, update, tabData, order, panelData.id)
  }
}

function normalizeTabData(
  state: RootState,
  update: UpdateLayoutPayloadSets,
  tabData: TabData,
  order: number,
  parentId: string
) {
  if (!tabData.id) {
    throw new Error('Expected tabData ID')
  }

  // rc-dock only sends ID of tab, so we have to complete fields with store data
  const storeTab = tabsSelectors.selectById(state, tabData.id)

  const tab = layout.tabSchema.parse({
    ...storeTab,
    ...tabData,
    order,
    parentId,
  })
  update.entities.tabs.push(tab)
  update.removeIds.boxIds.delete(tabData.id)
}

/**
 * Select layout update
 *
 * - Normalized layout (rc-dock layout transformed to flat structure to be saved in store).
 * - IDs that need to be removed.
 */
const selectLayoutUpdate = createSelector(
  [
    (state: RootState) => state,
    // Current IDs from store
    boxesSelectors.selectIds,
    panelsSelectors.selectIds,
    tabsSelectors.selectIds,
    // rc-dock layout
    (_, layout: LayoutBase) => layout,
  ],
  (state, boxIds, panelIds, tabIds, { dockbox }) => {
    if (!isBoxData(dockbox)) {
      throw new Error('Expected `layout.dockbox` to be `BoxData`')
    }

    const update: UpdateLayoutPayloadSets = {
      entities: { boxes: [], panels: [], tabs: [] },
      // Keep track of encountered IDs, the remaining ones are slated for removal
      removeIds: {
        boxIds: new Set(boxIds),
        panelIds: new Set(panelIds),
        tabIds: new Set(tabIds),
      },
    }

    normalizeBoxData(state, update, dockbox, 0, null)

    return {
      entities: update.entities,
      removeIds: {
        boxIds: [...update.removeIds.boxIds],
        panelIds: [...update.removeIds.panelIds],
        tabIds: [...update.removeIds.tabIds],
      },
    } satisfies UpdateLayoutPayload
  }
)

interface UpdateLayoutPayloadSets {
  entities: UpdateLayoutPayload['entities']
  removeIds: {
    boxIds: Set<string>
    panelIds: Set<string>
    tabIds: Set<string>
  }
}

export default selectLayoutUpdate
