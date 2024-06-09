import type { VersionInfo } from '@newsdash/schema'

import apiSlice from './apiSlice'

const version = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /** Fetch backend version info */
    getVersion: builder.query<VersionInfo, void>({
      query: () => 'version',
    }),
  }),
})

export const { useGetVersionQuery } = version
export default version
