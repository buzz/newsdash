/* eslint-disable @typescript-eslint/no-restricted-imports */
import {
  type TypedUseSelectorHook,
  useDispatch as useDispatchReactRedux,
  useSelector as useSelectorReactRedux,
} from 'react-redux'

import type { AppDispatch, RootState } from '#store/types'

export const useDispatch: () => AppDispatch = useDispatchReactRedux
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorReactRedux
