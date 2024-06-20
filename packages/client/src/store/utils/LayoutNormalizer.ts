import type { BoxData, LayoutBase, PanelData, TabData } from 'rc-dock'

import { layout } from '@newsdash/schema'
import type { Box, Panel, Tab } from '@newsdash/schema'

import { isBoxData, isPanelData } from '#types/typeGuards'

/**
 * Transform layout to be saved in store.
 */
class LayoutNormalizer {
  private layout: LayoutBase
  private boxIds: string[]
  private panelIds: string[]
  private tabIds: string[]
  private tabs: Tab[]
  private entities: NormalizedEntities = { boxes: [], panels: [], tabs: [] }

  constructor(layout: LayoutBase, boxIds: string[], panelIds: string[], tabs: Tab[]) {
    this.layout = layout
    this.tabs = tabs

    // Copy arrays, so they become configurable
    this.boxIds = [...boxIds]
    this.panelIds = [...panelIds]

    this.tabIds = tabs.map((tab) => tab.id)
  }

  normalizeLayout(): NormalizedLayoutState {
    const { dockbox } = this.layout

    if (!isBoxData(dockbox)) {
      throw new Error('Expected `layout.dockbox` to be `BoxData`')
    }

    this.handleBoxData(dockbox, 0, null)

    return {
      entities: this.entities,
      removeIds: {
        boxIds: this.boxIds as readonly string[],
        panelIds: this.panelIds as readonly string[],
        tabIds: this.tabIds as readonly string[],
      },
    }
  }

  private handleBoxData({ children, ...boxData }: BoxData, order: number, parentId: string | null) {
    if (!boxData.id) {
      throw new Error('Expected boxData ID')
    }

    const box = layout.boxSchema.parse({ ...boxData, order, parentId })
    this.entities.boxes.push(box)
    LayoutNormalizer.removeFromArray(boxData.id, this.boxIds)

    for (const [i, child] of children.entries()) {
      if (isBoxData(child)) {
        this.handleBoxData(child, i, boxData.id)
      } else if (isPanelData(child)) {
        this.handlePanelData(child, i, boxData.id)
      }
    }
  }

  private handlePanelData({ tabs, ...panelData }: PanelData, order: number, parentId: string) {
    if (!panelData.id) {
      throw new Error('Expected panelData ID')
    }

    const panel = layout.panelSchema.parse({ group: 'news', ...panelData, order, parentId })
    this.entities.panels.push(panel)
    LayoutNormalizer.removeFromArray(panelData.id, this.panelIds)

    for (const [order, tabData] of tabs.entries()) {
      this.handleTabData(tabData, order, panelData.id)
    }
  }

  private handleTabData(tabData: TabData, order: number, parentId: string) {
    if (!tabData.id) {
      throw new Error('Expected tabData ID')
    }

    // rc-dock only sends id of tab, so we have to complete fields with store data
    const storeTab = this.tabs.find((tab) => tab.id === tabData.id)
    if (!storeTab) {
      throw new Error(`Could not find corresponding tab in store: ${tabData.id}`)
    }

    const tab = layout.tabSchema.parse({
      ...storeTab,
      ...tabData,
      order,
      parentId,
    })
    this.entities.tabs.push(tab)
    LayoutNormalizer.removeFromArray(tabData.id, this.tabIds)
  }

  private static removeFromArray(id: string, arr: string[]) {
    const idx = arr.indexOf(id)
    if (idx >= 0) {
      arr.splice(idx, 1)
    }
  }
}

interface NormalizedEntities {
  boxes: Box[]
  panels: Panel[]
  tabs: Tab[]
}

interface NormalizedLayoutState {
  entities: NormalizedEntities
  removeIds: {
    boxIds: readonly string[]
    panelIds: readonly string[]
    tabIds: readonly string[]
  }
}

export type { NormalizedEntities, NormalizedLayoutState }
export default LayoutNormalizer
