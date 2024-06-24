import { Overlay, Transition, useMantineTheme } from '@mantine/core'

import type { Tab } from '@newsdash/schema'

import { DEFAULT_BLUR } from '#constants'
import { isTabEditMode } from '#types/typeGuards'

import EditFeedForm from './EditFeedForm/EditFeedForm'

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

export default FeedSettingsOverlay
