import type { ListenerEffectAPI, TypedStartListening } from '@reduxjs/toolkit'

import type { AppDispatch, RootState } from '#store/types'

type AppStartListening = TypedStartListening<RootState, AppDispatch>
type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

export type { AppListenerEffectAPI, AppStartListening }
