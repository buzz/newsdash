import type { PersistStateSchema } from '@newsdash/schema'

import apiSlice from './apiSlice'

const state = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getState: builder.query<PersistStateSchema, void>({
      query: () => 'user/state',
    }),
  }),
})

export const { useGetStateQuery } = state
export default state
