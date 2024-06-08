import type { LayoutBase } from 'rc-dock'

import type { NormalizedLayoutState } from '#store/utils/LayoutNormalizer'
import type { DenormalizedLayout } from '#types/layout'

import layoutSlice from './layoutSlice'

/** Handle rc-dock layout update */
export const rcLayoutChange = layoutSlice.createAction<LayoutBase>('rcLayoutChange')

/** Store Layout changed */
export const layoutChange = layoutSlice.createAction<DenormalizedLayout>('layoutChange')

/** Process normalized layout data */
export const updateLayout = layoutSlice.createAction<NormalizedLayoutState>('updateLayout')

/** Request new tab */
export const requestNewTab = layoutSlice.createAction<string | undefined>('requestNewTab')

/** Signal rc-dock is ready to process layouts */
export const rcLayoutReady = layoutSlice.createAction('rcLayoutReady')
