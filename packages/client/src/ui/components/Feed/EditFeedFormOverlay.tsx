import { Overlay, Transition, useMantineTheme } from '@mantine/core'

import type { Tab } from '@newsdash/common/schema'

import { DEFAULT_BLUR } from '#constants'
import { isTabEditMode } from '#types/typeGuards'

import EditFeedForm from './EditFeedForm/EditFeedForm'

function EditFeedFormOverlay({ feedItemCount = 0, tab }: EditFeedFormOverlayProps) {
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
          <EditFeedForm
            feedItemCount={feedItemCount}
            mode={status === 'new' ? 'new' : 'edit'}
            tab={tab}
          />
        </Overlay>
      )}
    </Transition>
  )
}

interface EditFeedFormOverlayProps {
  feedItemCount?: number
  tab: Tab
}

export default EditFeedFormOverlay
