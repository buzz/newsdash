import type makeStore from './makeStore'
import type reducer from './reducer'

/** Store type */
type Store = ReturnType<typeof makeStore>

/** Root state */
type RootState = ReturnType<typeof reducer>

/** Dispatch type */
type AppDispatch = Store['dispatch']

export type { AppDispatch, RootState, Store }
