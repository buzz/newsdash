import type { LayoutBase } from 'rc-dock'

import type { NormalizedEntities, NormalizedLayoutState } from '#store/utils/LayoutNormalizer'

import layoutSlice from './layoutSlice'

/** Handle rc-dock layout update */
const rcLayoutChange = layoutSlice.createAction<LayoutBase>('rcLayoutChange')

/** Update layout */
const updateLayout = layoutSlice.createAction<NormalizedLayoutState>('updateLayout')

/** Restore layout */
const restoreLayout = layoutSlice.createAction<NormalizedEntities>('restoreLayout')

/** Signal that layout was restored */
const layoutRestored = layoutSlice.createAction('layoutRestored')

/** Request new tab */
const requestNewTab = layoutSlice.createAction<string | undefined>('requestNewTab')

export { layoutRestored, rcLayoutChange, requestNewTab, restoreLayout, updateLayout }
