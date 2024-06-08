import type { BoxData, PanelData, TabData } from 'rc-dock'

/** Fields that are removed during normalization */
type RemoveFields =
  | 'cacheContext'
  | 'children'
  | 'content'
  | 'id'
  | 'panelLock'
  | 'parent'
  | 'tabs'
  | 'title'

/** Entities in rc-dock data */
export type RcDockEntity = BoxData | PanelData | TabData

export interface Orderable {
  /** Order in layout */
  order: number
}

/** Entity as saved in store */
export type NormalizedEntity<T extends RcDockEntity> = Omit<T, RemoveFields> &
  Orderable & {
    /** ID */
    id: string
    /** ID of parent */
    parentId: string | null
  }

export type Box = NormalizedEntity<BoxData>
export type Panel = NormalizedEntity<PanelData>

export type TabEditMode = 'edit' | 'create'

interface TabCustomFields {
  /** Custom title */
  customTitle?: string

  /** Feed URL */
  url?: string

  /** Edit mode */
  editMode?: TabEditMode
}

/** Feed tab */
export type Tab = NormalizedEntity<TabData> & TabCustomFields

export interface DenormalizedBox extends Omit<BoxData, 'children'> {
  children: (DenormalizedBox | DenormalizedPanel)[]
}

export interface DenormalizedPanel extends Omit<PanelData, 'tabs'> {
  tabs: DenormalizedTab[]
}

export type DenormalizedTab = Omit<TabData, 'content'> & TabCustomFields

export interface DenormalizedLayout {
  dockbox: DenormalizedBox
}
