import type makeStore from './makeStore'
import type reducer from './reducer'

/** Store type */
export type Store = ReturnType<typeof makeStore>

/** Root state */
export type RootState = ReturnType<typeof reducer>

/** Dispatch type */
export type AppDispatch = Store['dispatch']
