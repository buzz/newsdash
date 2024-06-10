import type { Result, Settings } from '@newsdash/schema'

import apiSlice from './apiSlice'

const settingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<Settings, void>({
      query: () => 'state/settings',
    }),
    persistSettings: builder.mutation<Result, Settings>({
      query: (body) => ({
        body,
        method: 'POST',
        url: 'state/settings',
      }),
    }),
  }),
})

export default settingsApi
