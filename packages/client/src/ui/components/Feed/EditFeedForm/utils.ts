import type { Tab } from '@newsdash/schema'

import type { TabEditMode } from '#types/layout'

import type { EditFeedFormValues } from './types'

function isValidUrl(urlString: string) {
  try {
    const url = new URL(urlString)
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return null
    }
  } catch {
    // empty
  }
  return 'Invalid URL'
}

function getInitialFormValues(mode: TabEditMode, tab: Tab): EditFeedFormValues {
  return mode === 'new'
    ? {
        customTitle: '',
        display: 'detailed',
        hue: tab.hue,
        url: '',
      }
    : {
        customTitle: tab.customTitle,
        display: tab.display,
        hue: tab.hue,
        url: tab.url,
      }
}

export { getInitialFormValues, isValidUrl }
