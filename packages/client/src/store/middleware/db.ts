import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'

import { DB_FEED_ITEM_STORE, DB_NAME, DB_SETTINGS_ID, DB_SETTINGS_STORE } from '#constants'
import type { FeedItem } from '#types/feed'
import type { Settings } from '#types/types'

const errorHandler = (reject: (reason?: unknown) => void) => (event: Event) => {
  const error = (event.target as IDBOpenDBRequest).error
  const message = `Database error: ${error ? error.message : UNKNOWN_ERROR_MESSAGE}`
  reject(new Error(message))
}

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)

    request.addEventListener('upgradeneeded', (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      if (!db.objectStoreNames.contains(DB_SETTINGS_STORE)) {
        db.createObjectStore(DB_SETTINGS_STORE, { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains(DB_FEED_ITEM_STORE)) {
        db.createObjectStore(DB_FEED_ITEM_STORE, { keyPath: 'id' })
      }
    })

    request.addEventListener('success', (event) => {
      resolve((event.target as IDBOpenDBRequest).result)
    })

    request.addEventListener('error', errorHandler(reject))
  })
}

async function saveSettings(settings: Settings) {
  const db = await openDatabase()

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([DB_SETTINGS_STORE], 'readwrite')
    const store = transaction.objectStore(DB_SETTINGS_STORE)
    const request = store.put({ ...settings, id: DB_SETTINGS_ID })

    request.addEventListener('success', () => {
      resolve()
    })

    request.addEventListener('error', errorHandler(reject))
  })
}

async function restoreSettings() {
  const db = await openDatabase()

  return new Promise<Settings | undefined>((resolve, reject) => {
    const transaction = db.transaction([DB_SETTINGS_STORE], 'readonly')
    const store = transaction.objectStore(DB_SETTINGS_STORE)
    const request = store.get(DB_SETTINGS_ID) as IDBRequest<DbSettings>

    request.addEventListener('success', (event) => {
      const { result } = event.target as IDBRequest<DbSettings | undefined>

      if (result) {
        const { id, ...settings } = result
        resolve(settings)
      } else {
        resolve(result)
      }
    })

    request.addEventListener('error', errorHandler(reject))
  })
}

async function saveFeedItems(feedItems: FeedItem[]) {
  const db = await openDatabase()

  const idsToSave = new Set(feedItems.map((item) => item.id))

  const storedIds = await new Promise<Set<string>>((resolve, reject) => {
    const transaction = db.transaction([DB_FEED_ITEM_STORE], 'readonly')
    const store = transaction.objectStore(DB_FEED_ITEM_STORE)
    const request = store.getAllKeys()

    request.addEventListener('success', (event) => {
      resolve(new Set((event.target as IDBRequest<string[]>).result))
    })

    request.addEventListener('error', errorHandler(reject))
  })

  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([DB_FEED_ITEM_STORE], 'readwrite')
    const store = transaction.objectStore(DB_FEED_ITEM_STORE)

    // Remove deleted
    for (const id of storedIds) {
      if (!idsToSave.has(id)) {
        store.delete(id)
      }
    }

    // Save items
    for (const item of feedItems) {
      if (!storedIds.has(item.id)) {
        const { new: _new, ...dbItem } = item
        store.put(dbItem)
      }
    }

    transaction.addEventListener('complete', () => {
      resolve()
    })

    transaction.addEventListener('error', errorHandler(reject))
  })
}

async function restoreFeedItems() {
  const db = await openDatabase()

  return new Promise<FeedItem[]>((resolve, reject) => {
    const transaction = db.transaction([DB_FEED_ITEM_STORE], 'readonly')
    const store = transaction.objectStore(DB_FEED_ITEM_STORE)
    const request = store.getAll()

    request.addEventListener('success', (event) => {
      const results = (event.target as IDBRequest<DbFeedItem[]>).result
      resolve(results.map((item) => ({ ...item, new: false })))
    })

    request.addEventListener('error', errorHandler(reject))
  })
}

interface DbSettings extends Settings {
  id: typeof DB_SETTINGS_ID
}

type DbFeedItem = Omit<FeedItem, 'new'>

export { restoreFeedItems, restoreSettings, saveFeedItems, saveSettings }
