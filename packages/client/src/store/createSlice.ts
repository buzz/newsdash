// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { createAction, createSlice as rtkCreateSlice } from '@reduxjs/toolkit'
import type { CreateSliceOptions, Slice as RtkSlice, SliceCaseReducers } from '@reduxjs/toolkit'

interface Slice<
  State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  Name extends string = string,
> extends RtkSlice<State, CaseReducers, Name> {
  createAction: typeof createAction
}

/**
 * Extends RTK slice object with a `createAction` method.
 */
function createSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>): Slice<State, CaseReducers, Name> {
  const slice = rtkCreateSlice(options) as Slice<State, CaseReducers, Name>
  slice.createAction = (type: string) => createAction(`${slice.name}/${type}`)
  return slice
}

export default createSlice
