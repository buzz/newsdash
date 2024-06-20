import { Overlay, Transition, useMantineTheme } from '@mantine/core'
import AutoSizer from 'react-virtualized-auto-sizer'

import type { Display, Tab } from '@newsdash/schema'

import { DEFAULT_BLUR } from '#constants'
import { selectByTabId } from '#store/slices/feedItems/selectors'
import tabsSelectors from '#store/slices/layout/entities/tabs/selectors'
import { isTabEditMode } from '#types/typeGuards'
import { useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'
import type { FeedItem as FeedItem } from '#types/feed'
import type { CustomTabData } from '#types/layout'

import EditFeedForm from './EditFeedForm/EditFeedForm'
import EmptyList from './EmptyList/EmptyList'
import WindowedScroller from './WindowedScroller'

import classes from './Feed.module.css'

const DEFAULT_MIN_WIDTH = 800

const DISPLAY_VALUES: Record<Display, DisplayValues> = {
  condensedList: {
    height: 24,
    overscanCount: 8,
  },
  list: {
    height: 36,
    overscanCount: 5,
  },
  detailed: {
    height: 92,
    minWidth: 500,
  },
  tiles: {
    height: 201,
    minWidth: 200,
  },
}

function FeedSettingsOverlay({ tab }: FeedSettingsOverlayProps) {
  const {
    other: { transition },
  } = useMantineTheme()
  const { status } = tab
  const showSettings = isTabEditMode(status)

  return (
    <Transition
      mounted={showSettings}
      transition="fade"
      duration={transition.duration.short}
      timingFunction={transition.timingFunction}
    >
      {(styles) => (
        <Overlay blur={DEFAULT_BLUR} style={styles}>
          <EditFeedForm tab={tab} mode={status === 'new' ? 'new' : 'edit'} />
        </Overlay>
      )}
    </Transition>
  )
}

interface FeedSettingsOverlayProps {
  tab: Tab
}

function Feed({ tab: { id: tabId } }: FeedProps) {
  if (tabId === undefined) {
    throw new Error('Expected tabId')
  }

  const tabSelector = (state: RootState) => tabsSelectors.selectById(state, tabId)
  const tab = useSelector(tabSelector)

  const feedItemsSelector = (state: RootState) => selectByTabId(state, tab.id)
  const feedItems = useSelector(feedItemsSelector)

  if (feedItems.length === 0) {
    return (
      <>
        <EmptyList tab={tab} />
        <FeedSettingsOverlay tab={tab} />
      </>
    )
  }

  const { height: itemHeight, minWidth, overscanCount } = DISPLAY_VALUES[tab.display]

  // TODO: useElementSize instead of AutoSizer?

  return (
    <AutoSizer className={classes.wrapper}>
      {({ height, width }) => (
        <>
          <WindowedScroller
            display={tab.display}
            language={tab.language}
            height={height}
            width={width}
            minWidth={minWidth ?? DEFAULT_MIN_WIDTH}
            rowHeight={itemHeight}
            items={feedItems}
            overscanCount={overscanCount ?? 1}
          />
          <FeedSettingsOverlay tab={tab} />
        </>
      )}
    </AutoSizer>
  )
}

interface DisplayValues {
  height: number
  minWidth?: number
  overscanCount?: number
}

interface FeedProps {
  tab: CustomTabData
}

interface GridData {
  items: FeedItem[]
  display: Display
  language: string
  columnCount: number
}

export type { GridData }
export default Feed
