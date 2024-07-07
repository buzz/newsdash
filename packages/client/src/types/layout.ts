import type { BoxData, PanelData, TabData } from 'rc-dock'

import type { CustomTabFields } from '@newsdash/common/schema'

type TabEditMode = 'edit' | 'new'

interface Orderable {
  order: number
}

interface CustomBoxChildren {
  children: (CustomBoxData | CustomPanelData)[]
}

type CustomBoxData = Omit<BoxData, 'children'> & CustomBoxChildren & Orderable

interface CustomPanelTabs {
  tabs: CustomTabData[]
}

type CustomPanelData = Omit<PanelData, 'tabs'> & CustomPanelTabs & Orderable

type CustomTabData = Omit<TabData, 'title' | 'content'> & CustomTabFields & Orderable

interface DenormalizedLayout {
  dockbox: CustomBoxData
}

export type {
  CustomBoxData,
  CustomPanelData,
  CustomTabData,
  DenormalizedLayout,
  Orderable,
  TabEditMode,
}
