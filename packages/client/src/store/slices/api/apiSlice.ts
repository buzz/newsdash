import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE, FETCH_TIMEOUT } from '#constants'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    timeout: FETCH_TIMEOUT,
  }),
  endpoints: () => ({}),
})

export const { reducer } = apiSlice
export default apiSlice
