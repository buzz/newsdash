import type { BoxData, LayoutBase, PanelData } from 'rc-dock'

import { isBoxData, isPanelData } from '#types/typeGuards'
import type { Box, NormalizedEntity, Panel, RcDockEntity, Tab } from '#types/layout'

/**
 * Transform layout to be saved in store.
 */
class LayoutNormalizer {
  private layout: LayoutBase
  private boxIds: string[]
  private panelIds: string[]
  private tabIds: string[]
  private entities: NormalizedEntities = { boxes: [], panels: [], tabs: [] }

  constructor(layout: LayoutBase, boxIds: string[], panelIds: string[], tabIds: string[]) {
    this.layout = layout
    // Copy arrays, so they become configurable
    this.boxIds = [...boxIds]
    this.panelIds = [...panelIds]
    this.tabIds = [...tabIds]
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

  /** Handle `BoxData` */
  private handleBoxData(boxData: BoxData, order: number, parentId: string | null) {
    if (!boxData.id) {
      throw new Error('Expected boxData ID')
    }

    this.entities.boxes.push(this.normalizeEntity(boxData, order, parentId))
    LayoutNormalizer.removeId(boxData.id, this.boxIds)

    for (const [i, child] of boxData.children.entries()) {
      if (isBoxData(child)) {
        this.handleBoxData(child, i, boxData.id)
      } else if (isPanelData(child)) {
        this.handlePanelData(child, i, boxData.id)
      }
    }
  }

  /** Handle `PanelData` */
  private handlePanelData(panelData: PanelData, order: number, parentId: string) {
    if (!panelData.id) {
      throw new Error('Expected panelData ID')
    }

    this.entities.panels.push(this.normalizeEntity(panelData, order, parentId))
    LayoutNormalizer.removeId(panelData.id, this.panelIds)

    for (const [i, tabData] of panelData.tabs.entries()) {
      if (!tabData.id) {
        throw new Error('Expected tabData ID')
      }

      const tab = this.normalizeEntity(tabData, i, panelData.id)
      this.entities.tabs.push(tab)
      LayoutNormalizer.removeId(tabData.id, this.tabIds)
    }
  }

  /**
   * Normalize entity by removing included objects, some other cruft and adding
   * `parentId` and `order` field.
   */
  private normalizeEntity<T extends RcDockEntity>(
    entity: T,
    order: number,
    parentId: string | null
  ) {
    const normalizedEntity: Record<string, unknown> = { parentId, order }

    for (const [key, value] of Object.entries(entity)) {
      if (typeof value === 'string' || typeof value === 'number') {
        normalizedEntity[key] = value
      }
    }

    return normalizedEntity as NormalizedEntity<T>
  }

  private static removeId(id: string, arr: string[]) {
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

export interface NormalizedLayoutState {
  entities: NormalizedEntities
  removeIds: {
    boxIds: readonly string[]
    panelIds: readonly string[]
    tabIds: readonly string[]
  }
}

export default LayoutNormalizer
