import type { ListenerMiddlewareInstance, SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'
import type { PersistLayout } from '@newsdash/common/schema'

import { isArbitraryObject } from '#types/typeGuards'
import type { NormalizedEntities } from '#types/types'

import type { AppListenerEffectAPI, AppStartListening } from './types'

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
  return UNKNOWN_ERROR_MESSAGE
}

function fromPersistLayout({ boxes, panels, tabs }: PersistLayout): NormalizedEntities {
  return {
    boxes,
    panels: panels.map((panel) => ({
      ...panel,
      activeId: tabs.find((tab) => tab.parentId === panel.id && tab.order === 0)?.id,
    })),
    tabs: tabs.map((tab) => ({
      ...tab,
      lastFetched: 0,
      status: 'loaded',
    })),
  }
}

function listenToEffects(
  middleware: ListenerMiddlewareInstance,
  effects: ((startListening: AppStartListening) => void)[]
) {
  for (const effect of effects) {
    effect(middleware.startListening as AppStartListening)
  }
}

export { debounce, extractQueryError, fromPersistLayout, listenToEffects }
