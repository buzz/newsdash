import type { Feed } from '@newsdash/common/schema'

import apiSlice from './apiSlice'

const feedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFeed: builder.query<Feed, string>({
      query: (url) => `feed/parse?url=${encodeURIComponent(url)}`,
    }),
  }),
})

export default feedApi
