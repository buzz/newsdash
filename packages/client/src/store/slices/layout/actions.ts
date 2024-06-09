import type { LayoutBase } from 'rc-dock'

import type { NormalizedEntities, NormalizedLayoutState } from '#store/utils/LayoutNormalizer'

import layoutSlice from './layoutSlice'

/** Handle rc-dock layout update */
const rcLayoutChange = layoutSlice.createAction<LayoutBase>('rcLayoutChange')

/** Update layout */
const updateLayout = layoutSlice.createAction<NormalizedLayoutState>('updateLayout')

/** Restore layout */
const restoreLayout = layoutSlice.createAction<NormalizedEntities>('restoreLayout')

/** Request new tab */
const requestNewTab = layoutSlice.createAction<string | undefined>('requestNewTab')

/** Signal rc-dock is ready to process layouts */
const rcLayoutReady = layoutSlice.createAction('rcLayoutReady')

export { rcLayoutChange, rcLayoutReady, requestNewTab, restoreLayout, updateLayout }
