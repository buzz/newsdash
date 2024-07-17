import type { ListenerEffectAPI } from '@reduxjs/toolkit'

import type { AppDispatch, RootState } from '#store/types'

type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

export type { AppListenerEffectAPI }
