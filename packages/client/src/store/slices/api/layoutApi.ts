import type { PersistLayout, Result } from '@newsdash/common/schema'

import apiSlice from './apiSlice'

const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayout: builder.query<PersistLayout, void>({
      query: () => 'state/layout',
    }),
    persistLayout: builder.mutation<Result, PersistLayout>({
      query: (body) => ({
        body,
        method: 'POST',
        url: 'state/layout',
      }),
    }),
  }),
})

export default layoutApi
