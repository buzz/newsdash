import memoize from 'memoizee'

import type { FeedItem } from '#types/feed'

function selectFeedItems(feedItems: FeedItem[], filters: MatchFn[], tabId: string) {
  return Object.values(feedItems).filter(
    (item) =>
      item.tabId === tabId &&
      !filters.some((filter) => filter(`${item.link}${item.title}${item.content}`))
  )
}

function selectFilters(filterStrings: string[]) {
  return filterStrings.map((filterString) => {
    const filterLower = filterString.toLowerCase()

    let matchFunc: MatchFn
    if (filterLower.startsWith('/') && filterLower.endsWith('/')) {
      const re = new RegExp(filterLower.slice(1, -1), 'i')
      matchFunc = (string: string) => re.test(string)
    } else {
      matchFunc = (string: string) => string.toLowerCase().includes(filterLower)
    }

    // Assign custom name for cache key
    Object.defineProperty(matchFunc, 'name', { value: filterString })

    return matchFunc
  })
}

/** Create memoized LRU selectors */
function makeTabDataCache(feedItems: FeedItem[], tabCount: number) {
  const memoizeOpts = { max: tabCount, primitive: true }
  return {
    selectFeedItems: memoize(selectFeedItems, {
      ...memoizeOpts,
      normalizer: ([, filters, tabId]) => `${tabId}${filters.map((fn) => fn.name).join('')}`,
    }),
    selectFilters: memoize(selectFilters, memoizeOpts),
  }
}

type MatchFn = (string: string) => boolean
type TabDataCache = ReturnType<typeof makeTabDataCache>

export type { TabDataCache }
export default makeTabDataCache
