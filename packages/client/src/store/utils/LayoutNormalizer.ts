import type { EntityId } from '@reduxjs/toolkit'
import type { BoxData, LayoutBase, PanelData, TabData } from 'rc-dock'

import type { Entity, NormalizedEntity } from '#types/layout'
import { isBoxData, isPanelData } from '#types/typeGuards'

interface NormalizedEntities {
  boxes: NormalizedEntity<BoxData>[]
  panels: NormalizedEntity<PanelData>[]
  tabs: NormalizedEntity<TabData>[]
}

export type NormalizedLayoutState = ReturnType<LayoutNormalizer['normalizeLayout']>

class LayoutNormalizer {
  private layout: LayoutBase
  private boxIds: EntityId[]
  private panelIds: EntityId[]
  private tabIds: EntityId[]
  private entities: NormalizedEntities = { boxes: [], panels: [], tabs: [] }

  constructor(layout: LayoutBase, boxIds: EntityId[], panelIds: EntityId[], tabIds: EntityId[]) {
    this.layout = layout
    // Copy arrays, so they become configurable
    this.boxIds = [...boxIds]
    this.panelIds = [...panelIds]
    this.tabIds = [...tabIds]
  }

  normalizeLayout() {
    const { dockbox } = this.layout

    if (!isBoxData(dockbox)) {
      throw new Error('Expected `layout.dockbox` to be `BoxData`')
    }

    this.handleBoxData(dockbox, 0, null)

    return {
      entities: this.entities,
      remainingIds: {
        boxIds: this.boxIds,
        panelIds: this.panelIds,
        tabIds: this.tabIds,
      },
    }
  }

  /** Handle `BoxData` */
  private handleBoxData(boxData: BoxData, order: number, parentId: string) {
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
    this.entities.panels.push(this.normalizeEntity(panelData, order, parentId))
    LayoutNormalizer.removeId(panelData.id, this.panelIds)

    for (const [i, tabData] of panelData.tabs.entries()) {
      this.entities.tabs.push(this.normalizeEntity(tabData, i, panelData.id))
      LayoutNormalizer.removeId(tabData.id, this.tabIds)
    }
  }

  /**
   * Normalize entity by removing included objects, some other cruft and adding
   * `parentId` and `order` field.
   */
  private normalizeEntity<T extends Entity>(entity: T, order: number, parentId: string) {
    return Object.entries(entity).reduce(
      (acc, [key, val]) =>
        typeof val === 'string' || typeof val === 'number' ? { ...acc, [key]: val } : acc,
      { parentId, order } as NormalizedEntity<T>
    )
  }

  private static removeId(id: string, arr: EntityId[]) {
    const idx = arr.indexOf(id)
    if (idx >= 0) {
      try {
        arr.splice(idx, 1)
      } catch {
        debugger
      }
    }
  }
}

export default LayoutNormalizer
