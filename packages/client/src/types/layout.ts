import type { BoxData, PanelData, TabData } from 'rc-dock'

type RemoveFields = 'cacheContext' | 'children' | 'content' | 'panelLock' | 'parent' | 'tabs'

export type Entity = BoxData | PanelData | TabData

export interface Orderable {
  /** Order in layout */
  order: number
}

export type NormalizedEntity<T extends Entity = Entity> = Omit<T, RemoveFields> &
  Orderable & {
    /** ID of parent */
    parentId: string
  }

export type NormalizedBox = NormalizedEntity<BoxData>
export type NormalizedPanel = NormalizedEntity<PanelData>
export type NormalizedTab = NormalizedEntity<TabData>

export interface DenormalizedBox extends Omit<BoxData, 'children'> {
  children: (DenormalizedBox | DenormalizedPanel)[]
}

export interface DenormalizedPanel extends Omit<PanelData, 'tabs'> {
  tabs: DenormalizedTab[]
}

export type DenormalizedTab = Omit<TabData, 'content'>
