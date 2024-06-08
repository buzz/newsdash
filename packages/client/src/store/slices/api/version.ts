import type { VersionInfo } from '#types/types'

import apiSlice from './apiSlice'

export const version = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /** Fetch backend version info */
    getVersion: builder.query<VersionInfo, void>({
      query: () => 'version',
    }),
  }),
})

export const { useGetVersionQuery } = version
export default version
