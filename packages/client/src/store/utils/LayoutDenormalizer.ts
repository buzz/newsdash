import type { Box, Panel } from '@newsdash/schema'

import { TAB_MIN_HEIGHT, TAB_MIN_WIDTH } from '#constants'
import { selectChildBoxes, selectDockbox } from '#store/slices/layout/entities/boxes/selectors'
import { selectChildPanels } from '#store/slices/layout/entities/panels/selectors'
import { selectChildTabs } from '#store/slices/layout/entities/tabs/selectors'
import type { RootState } from '#store/types'
import type {
  CustomBoxData,
  CustomPanelData,
  CustomTab,
  CustomTabData,
  DenormalizedLayout,
} from '#types/layout'

import { orderSortComparer } from './sortComparer'

/**
 * Transform layout to by rc-dock's nested structure.
 */
class LayoutDenormalizer {
  private state: RootState

  constructor(state: RootState) {
    this.state = state
  }

  denormalizeLayout(): DenormalizedLayout {
    const dockbox = selectDockbox(this.state)

    return {
      dockbox: dockbox
        ? this.denormalizeBox(dockbox)
        : { mode: 'horizontal', children: [], order: 0 },
    }
  }

  /**
   * Denormalize box by including `children` and removing `parentId` and `order` fields.
   */
  private denormalizeBox(box: Box): CustomBoxData {
    const children = [
      ...this.getChildBoxes(box.id).map((child) => this.denormalizeBox(child)),
      ...this.getChildPanels(box.id).map((child) => this.denormalizePanel(child)),
    ].sort(orderSortComparer)

    return {
      ...box,
      children,
    }
  }

  private getChildBoxes(parentId: string) {
    const selector = (state: RootState) => selectChildBoxes(state, parentId)
    return selector(this.state)
  }

  private getChildPanels(parentId: string) {
    const selector = (state: RootState) => selectChildPanels(state, parentId)
    return selector(this.state)
  }

  /**
   * Denormalize panel by including `tabs` and removing `parentId` and `order` fields.
   */
  private denormalizePanel(panel: Panel): CustomPanelData {
    return {
      ...panel,
      tabs: this.denormalizeTabs(panel),
    }
  }

  /**
   * Denormalize tabs.
   */
  private denormalizeTabs(panel: Panel): CustomTabData[] {
    const selector = (state: RootState) => selectChildTabs(state, panel.id)
    return selector(this.state).map((tab) => this.denormalizeTab(tab))
  }

  /**
   * Denormalize tab by removing `parentId`, `order`.
   */
  private denormalizeTab(tab: CustomTab): CustomTabData {
    return {
      ...tab,
      minHeight: TAB_MIN_HEIGHT,
      minWidth: TAB_MIN_WIDTH,
    }
  }
}

export default LayoutDenormalizer
