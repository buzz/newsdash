import type { Result, Settings } from '@newsdash/schema'

import apiSlice from './apiSlice'

const settings = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    persistSettings: builder.mutation<Result, Settings>({
      query: (body) => ({
        body,
        method: 'POST',
        url: 'user/state/settings',
      }),
    }),
  }),
})

export default settings
