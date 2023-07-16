import type { LayoutBase } from 'rc-dock'

import type { NormalizedLayoutState } from '#store/utils/LayoutNormalizer'

import layoutSlice from './layoutSlice'

/** Handle rc-dock layout update */
export const handleLayoutChange = layoutSlice.createAction<LayoutBase>('handleLayoutChange')

/** Process normalized layout data */
export const updateLayout = layoutSlice.createAction<NormalizedLayoutState>('updateLayout')

/** Request new tab */
export const requestNewTab = layoutSlice.createAction<string>('requestNewTab')

/** Signal rc-dock is ready to process layouts */
export const layoutReady = layoutSlice.createAction('layoutReady')
