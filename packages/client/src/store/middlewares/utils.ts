import type { AppListenerEffectAPI } from './types'

async function debounce(listenerApi: AppListenerEffectAPI, delay: number) {
  listenerApi.cancelActiveListeners()
  await listenerApi.delay(delay)
}

export { debounce }
