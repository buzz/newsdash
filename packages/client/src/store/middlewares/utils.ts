import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { isArbitraryObject } from '#types/typeGuards'

import type { AppListenerEffectAPI } from './types'

async function debounce(listenerApi: AppListenerEffectAPI, delay: number) {
  listenerApi.cancelActiveListeners()
  await listenerApi.delay(delay)
}

function extractQueryError(error: FetchBaseQueryError | SerializedError): string {
  if ('data' in error && isArbitraryObject(error.data) && typeof error.data.message === 'string') {
    return error.data.message
  }
  if ('error' in error && typeof error.error === 'string') {
    return error.error
  }
  if ('message' in error && typeof error.message === 'string') {
    return error.message
  }
  return 'Unknown error'
}

export { debounce, extractQueryError }
