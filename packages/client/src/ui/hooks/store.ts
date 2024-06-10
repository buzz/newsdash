/* eslint-disable @typescript-eslint/no-restricted-imports */
import {
  useDispatch as useDispatchReactRedux,
  useSelector as useSelectorReactRedux,
  useStore as useStoreReactRedux,
} from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import type { AppDispatch, RootState, Store } from '#store/types'

const useDispatch: () => AppDispatch = useDispatchReactRedux
const useSelector: TypedUseSelectorHook<RootState> = useSelectorReactRedux
const useStore = useStoreReactRedux.withTypes<Store>()

export { useDispatch, useSelector, useStore }
