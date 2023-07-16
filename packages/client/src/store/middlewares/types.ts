import type { TypedStartListening } from '@reduxjs/toolkit'

import type { AppDispatch, RootState } from '#store/types'

export type AppStartListening = TypedStartListening<RootState, AppDispatch>
