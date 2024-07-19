/* eslint-disable @typescript-eslint/no-restricted-imports */
import {
  useDispatch as useDispatchReactRedux,
  useSelector as useSelectorReactRedux,
} from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import type { AppDispatch, RootState } from '#store/types'

const useDispatch: () => AppDispatch = useDispatchReactRedux
const useSelector: TypedUseSelectorHook<RootState> = useSelectorReactRedux

export { useDispatch, useSelector }
