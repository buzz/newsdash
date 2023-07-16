import type { StateFromReducersMapObject } from '@reduxjs/toolkit'

import type makeStore from './makeStore'
import type reducer from './reducer'

/** Store type */
export type Store = ReturnType<typeof makeStore>

/** Root state */
export type RootState = StateFromReducersMapObject<typeof reducer>

/** Dispatch type */
export type AppDispatch = Store['dispatch']
