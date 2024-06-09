import type { NormalizedEntities, NormalizedLayoutState } from '#store/utils/LayoutNormalizer'
import type { CustomLayoutBase } from '#types/layout'

import layoutSlice from './layoutSlice'

/** Handle rc-dock layout update */
const rcLayoutChange = layoutSlice.createAction<CustomLayoutBase>('rcLayoutChange')

/** Update layout */
const updateLayout = layoutSlice.createAction<NormalizedLayoutState>('updateLayout')

/** Restore layout */
const restoreLayout = layoutSlice.createAction<NormalizedEntities>('restoreLayout')

/** Request new tab */
const requestNewTab = layoutSlice.createAction<string | undefined>('requestNewTab')

/** Signal rc-dock is ready to process layouts */
const rcLayoutReady = layoutSlice.createAction('rcLayoutReady')

export { rcLayoutChange, rcLayoutReady, requestNewTab, restoreLayout, updateLayout }
