import { EMPTY_LAYOUT } from '#constants'
import { selectChildBoxes, selectDockbox } from '#store/slices/layout/entities/boxes/selectors'
import { selectChildPanels } from '#store/slices/layout/entities/panels/selectors'
import { selectChildTabs } from '#store/slices/layout/entities/tabs/selectors'
import { isNormalizedBox } from '#types/typeGuards'
import type { RootState } from '#store/types'
import type {
  Box,
  DenormalizedBox,
  DenormalizedPanel,
  DenormalizedTab,
  Panel,
  Tab,
} from '#types/layout'

import sortOrderComparer from './sortOrderComparer'

/**
 * Transform layout to by rc-dock's nested structure.
 */
class LayoutDenormalizer {
  private state: RootState

  constructor(state: RootState) {
    this.state = state
  }

  denormalizeLayout() {
    const dockbox = selectDockbox(this.state)

    // Return empty layout if we don't have one yet
    if (dockbox === undefined) {
      return EMPTY_LAYOUT
    }

    return { dockbox: this.denormalizeBox(dockbox) }
  }

  /**
   * Denormalize box by including `children` and removing `parentId` and `order` fields.
   */
  private denormalizeBox(box: Box): DenormalizedBox {
    const childBoxes = this.getChildBoxes(box.id)
    const childPanels = this.getChildPanels(box.id)

    const children = [...childBoxes, ...childPanels]
      .sort(sortOrderComparer)
      .map((child) =>
        isNormalizedBox(child) ? this.denormalizeBox(child) : this.denormalizePanel(child)
      )

    return {
      id: box.id,
      children: children,
      mode: box.mode,
      size: box.size,
      widthFlex: box.widthFlex,
      heightFlex: box.heightFlex,
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
  private denormalizePanel(panel: Panel): DenormalizedPanel {
    return {
      id: panel.id,
      size: panel.size,
      activeId: panel.activeId,
      group: panel.group,
      x: panel.x,
      y: panel.y,
      z: panel.z,
      w: panel.w,
      h: panel.h,
      widthFlex: panel.widthFlex,
      heightFlex: panel.heightFlex,
      tabs: this.denormalizeTabs(panel.id),
    }
  }

  /**
   * Denormalize tabs.
   */
  private denormalizeTabs(parentId: string) {
    const selector = (state: RootState) => selectChildTabs(state, parentId)
    return selector(this.state).map((tab) => this.denormalizeTab(tab))
  }

  /**
   * Denormalize tab by removing `parentId`, `order` and custom fields.
   */
  private denormalizeTab(tab: Tab): DenormalizedTab {
    return {
      id: tab.id,
      group: tab.group,
      closable: tab.closable,
      cached: tab.cached,
      minWidth: tab.minWidth,
      minHeight: tab.minHeight,
      title: '',
      customTitle: tab.customTitle,
      editMode: tab.editMode,
      url: tab.url,
    }
  }
}

export default LayoutDenormalizer
