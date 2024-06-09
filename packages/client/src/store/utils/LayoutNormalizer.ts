import { layout } from '@newsdash/schema'
import type { Box, Panel } from '@newsdash/schema'

import { isCustomBoxData, isCustomPanelData } from '#types/typeGuards'
import type {
  CustomBoxData,
  CustomLayoutBase,
  CustomPanelData,
  CustomTab,
  CustomTabData,
} from '#types/layout'

/**
 * Transform layout to be saved in store.
 */
class LayoutNormalizer {
  private layout: CustomLayoutBase
  private boxIds: string[]
  private panelIds: string[]
  private tabIds: string[]
  private entities: NormalizedEntities = { boxes: [], panels: [], tabs: [] }

  constructor(layout: CustomLayoutBase, boxIds: string[], panelIds: string[], tabIds: string[]) {
    this.layout = layout
    // Copy arrays, so they become configurable
    this.boxIds = [...boxIds]
    this.panelIds = [...panelIds]
    this.tabIds = [...tabIds]
  }

  normalizeLayout(): NormalizedLayoutState {
    const { dockbox } = this.layout

    if (!isCustomBoxData(dockbox)) {
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
  private handleBoxData(boxData: CustomBoxData, order: number, parentId: string | null) {
    if (!boxData.id) {
      throw new Error('Expected boxData ID')
    }

    const box = layout.boxSchema.parse(this.normalizeEntity(boxData, order, parentId))
    this.entities.boxes.push(box)
    LayoutNormalizer.removeId(boxData.id, this.boxIds)

    for (const [i, child] of boxData.children.entries()) {
      if (isCustomBoxData(child)) {
        this.handleBoxData(child, i, boxData.id)
      } else if (isCustomPanelData(child)) {
        this.handlePanelData(child, i, boxData.id)
      }
    }
  }

  /** Handle `PanelData` */
  private handlePanelData(panelData: CustomPanelData, order: number, parentId: string) {
    if (!panelData.id) {
      throw new Error('Expected panelData ID')
    }

    const panel = layout.panelSchema.parse(this.normalizeEntity(panelData, order, parentId))
    this.entities.panels.push(panel)
    LayoutNormalizer.removeId(panelData.id, this.panelIds)

    for (const [i, tabData] of panelData.tabs.entries()) {
      if (!tabData.id) {
        throw new Error('Expected tabData ID')
      }

      const tab = layout.tabSchema.parse(this.normalizeEntity(tabData, i, panelData.id))
      this.entities.tabs.push(tab)
      LayoutNormalizer.removeId(tabData.id, this.tabIds)
    }
  }

  /**
   * Normalize entity by removing included objects, some other cruft and adding
   * `parentId` and `order` field.
   */
  private normalizeEntity<T extends RcEntityData>(
    entity: T,
    order: number,
    parentId: string | null
  ) {
    const normalizedEntity: Record<string, unknown> = { parentId, order }

    for (const [key, value] of Object.entries(entity)) {
      if (typeof value === 'string' || typeof value === 'number' || value === null) {
        normalizedEntity[key] = value
      }
    }

    return normalizedEntity
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
  tabs: CustomTab[]
}

type RcEntityData = CustomBoxData | CustomPanelData | CustomTabData

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
