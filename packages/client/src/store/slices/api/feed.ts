import type { FetchFeedBody } from '@newsdash/schema'

import apiSlice from './apiSlice'

const feed = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchFeed: builder.query<string, FetchFeedBody>({
      query: (body) => ({
        body,
        method: 'POST',
        url: 'proxy/feed',
        responseHandler: 'text',
      }),
    }),
  }),
})

export default feed
