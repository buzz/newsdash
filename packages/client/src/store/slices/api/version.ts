import apiSlice from '#store/slices/apiSlice'
import type { VersionInfo } from '#types/types'

export const version = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /** Fetch backend version info */
    getVersion: builder.query<VersionInfo, undefined>({
      query: () => 'version',
    }),
  }),
})

export const { useGetVersionQuery } = version
export default version
