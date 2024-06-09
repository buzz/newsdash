import type { PersistLayout, Result } from '@newsdash/schema'

import apiSlice from './apiSlice'

const layout = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    persistLayout: builder.mutation<Result, PersistLayout>({
      query: (body) => ({
        body,
        method: 'POST',
        url: 'user/state/layout',
      }),
    }),
  }),
})

export default layout
