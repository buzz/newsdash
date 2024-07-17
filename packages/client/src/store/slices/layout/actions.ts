import type { LayoutBase } from 'rc-dock'

import type { NormalizedEntities } from '#types/types'

import layoutSlice from './layoutSlice'

/** Handle rc-dock layout update */
const rcLayoutChange = layoutSlice.createAction<LayoutBase>('rcLayoutChange')

/** Update layout */
const updateLayout = layoutSlice.createAction<UpdateLayoutPayload>('updateLayout')

/** Restore layout */
const restoreLayout = layoutSlice.createAction<NormalizedEntities>('restoreLayout')

/** Request new tab */
const requestNewTab = layoutSlice.createAction<string | undefined>('requestNewTab')

/** Refresh all tabs */
const refreashAllTabs = layoutSlice.createAction('refreshAllTabs')

interface UpdateLayoutPayload {
  entities: NormalizedEntities
  removeIds: {
    boxIds: string[]
    panelIds: string[]
    tabIds: string[]
  }
}

export type { UpdateLayoutPayload }
export { rcLayoutChange, refreashAllTabs, requestNewTab, restoreLayout, updateLayout }
