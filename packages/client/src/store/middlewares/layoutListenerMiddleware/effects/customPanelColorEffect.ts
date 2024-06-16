import { isAnyOf } from '@reduxjs/toolkit'
import tinycolor from 'tinycolor2'

import { debounce } from '#store/middlewares/utils'
import { changeColorScheme } from '#store/slices/app/actions'
import { selectColorScheme } from '#store/slices/app/selectors'
import { layoutRestored, updateLayout } from '#store/slices/layout/actions'
import { updatePanel } from '#store/slices/layout/entities/panels/actions'
import panelsSelectors from '#store/slices/layout/entities/panels/selectors'
import { addTab, editTab, removeTab } from '#store/slices/layout/entities/tabs/actions'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { updateSettings } from '#store/slices/settings/actions'
import selectSettings from '#store/slices/settings/selectors'
import type { AppStartListening } from '#store/middlewares/types'
import type { Settings } from '#types/types'

const DEBOUNCE_DELAY = 100

function insertRule(
  sheet: CSSStyleSheet,
  panelId: string,
  hue: number,
  { lightness, saturation, tabColors }: Settings,
  colorScheme: 'light' | 'dark'
) {
  const selector = `[data-dockid="${panelId}"]`

  // Find and delete selector if exists
  let index: number | undefined
  for (let i = 0; i < sheet.cssRules.length; ++i) {
    const r = sheet.cssRules[i]
    if (r instanceof CSSStyleRule && r.selectorText === selector) {
      index = i
      break
    }
  }
  if (index !== undefined) {
    sheet.deleteRule(index)
  }

  // (Re)create rule
  if (tabColors) {
    const baseLightness = colorScheme === 'dark' ? 0.2 : 0.8

    const tcColor = tinycolor({
      h: hue,
      s: saturation / 100,
      l: baseLightness + lightness / 100,
    })

    const ruleText = `${selector} { background-color: ${tcColor.toRgbString()} !important; }`
    sheet.insertRule(ruleText, sheet.cssRules.length)
  }
}

function customPanelColorEffect(startListening: AppStartListening) {
  let styleElem: HTMLStyleElement | undefined

  function getSheet() {
    if (!styleElem) {
      styleElem = document.createElement('style')
      styleElem.setAttribute('type', 'text/css')
      document.head.append(styleElem)
    }
    const { sheet } = styleElem
    if (!sheet) {
      throw new Error('Expected style element to have sheet')
    }

    return sheet
  }

  // Flip lightness on color scheme change
  startListening({
    actionCreator: changeColorScheme,
    effect: (action, listenerApi) => {
      const { lightness } = selectSettings(listenerApi.getState())
      listenerApi.dispatch(updateSettings({ lightness: -lightness }))
    },
  })

  // Update style tag with custom classes
  startListening({
    matcher: isAnyOf(
      addTab,
      changeColorScheme,
      editTab,
      removeTab,
      layoutRestored,
      updateLayout,
      updatePanel,
      updateSettings
    ),
    effect: async (action, listenerApi) => {
      await debounce(listenerApi, DEBOUNCE_DELAY)

      const state = listenerApi.getState()
      const settings = selectSettings(state)
      const colorScheme = selectColorScheme(state)
      const sheet = getSheet()

      const panels = panelsSelectors.selectAll(state)
      const tabs = tabsSelectors.selectAll(state)

      for (const panel of panels) {
        const activeTab = tabs.find((tab) => tab.id === panel.activeId)
        if (activeTab) {
          insertRule(sheet, panel.id, activeTab.hue, settings, colorScheme)
        }
      }
    },
  })
}

export default customPanelColorEffect
