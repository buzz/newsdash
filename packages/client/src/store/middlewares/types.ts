import type { TypedStartListening } from '@reduxjs/toolkit'

import type { AppDispatch, RootState } from '#store/makeStore'

export type AppStartListening = TypedStartListening<RootState, AppDispatch>
