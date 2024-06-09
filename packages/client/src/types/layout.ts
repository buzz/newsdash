import type { BoxData, LayoutBase, PanelData, TabData } from 'rc-dock'

import type { CustomTabFields, Tab } from '@newsdash/schema'

type TabEditMode = 'create' | 'edit' | undefined

interface EditModeMixin {
  editMode?: TabEditMode
}

interface Orderable {
  order: number
}

type CustomLayoutBase = Omit<LayoutBase, 'dockbox'> & {
  dockbox: CustomBoxData
}

interface CustomBoxChildren {
  children: (CustomBoxData | CustomPanelData)[]
}

type CustomBoxData = Omit<BoxData, 'children'> & CustomBoxChildren & Orderable

interface CustomPanelTabs {
  tabs: CustomTabData[]
}

type CustomPanelData = Omit<PanelData, 'tabs'> & CustomPanelTabs & Orderable

type CustomTab = Tab & EditModeMixin

type CustomTabData = Omit<TabData, 'title' | 'content'> &
  CustomTabFields &
  EditModeMixin &
  Orderable

interface DenormalizedLayout {
  dockbox: CustomBoxData
}

export type {
  CustomBoxData,
  CustomLayoutBase,
  CustomPanelData,
  CustomTab,
  CustomTabData,
  DenormalizedLayout,
  Orderable,
  TabEditMode,
}
