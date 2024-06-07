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
   * Denormalize box by including children and removing `parentId` and `order`
   * fields.
   */
  private denormalizeBox(box: Box): DenormalizedBox {
    const childBoxes = this.getChildBoxes(box.id)
    const childPanels = this.getChildPanels(box.id)

    const children = [...childBoxes, ...childPanels]
      .sort(sortOrderComparer)
      .map((child) =>
        isNormalizedBox(child) ? this.denormalizeBox(child) : this.denormalizePanel(child)
      )

    const denormalizedBox = { ...box, children }
    delete denormalizedBox.parentId
    delete denormalizedBox.order
    return denormalizedBox
  }

  private getChildBoxes(parentId: string) {
    const selector = (state: RootState) => selectChildBoxes(state, parentId)
    return selector(this.state)
  }

  private getChildPanels(parentId: string) {
    const selector = (state: RootState) => selectChildPanels(state, parentId)
    return selector(this.state)
  }

  private denormalizePanel(panel: Panel): DenormalizedPanel {
    const denormalizedPanel = {
      ...panel,
      tabs: this.denormalizeTabs(panel.id),
    }

    delete denormalizedPanel.parentId
    delete denormalizedPanel.order
    return denormalizedPanel
  }

  private denormalizeTabs(parentId: string) {
    const selector = (state: RootState) => selectChildTabs(state, parentId)
    return selector(this.state).map((t) => this.denormalizeTab(t))
  }

  private denormalizeTab(tab: Tab): DenormalizedTab {
    const denormalizedTab = { ...tab }
    delete denormalizedTab.parentId
    delete denormalizedTab.order
    return denormalizedTab
  }
}

export default LayoutDenormalizer
