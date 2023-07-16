import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { FETCH_TIMEOUT } from '#constants'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.NEWSDASH_API_BASE,
    timeout: FETCH_TIMEOUT,
  }),
  endpoints: () => ({}),
})

export const { reducer } = apiSlice
export default apiSlice
