import { Stack } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { throttle } from 'lodash-es'

import { updateSettings as updateSettingsAction } from '#store/slices/settings/actions'
import selectSettings from '#store/slices/settings/selectors'
import ModalInner from '#ui/components/App/Modal/ModalInner'
import Divider from '#ui/components/common/Divider/Divider'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { Settings } from '#types/types'

import ColorSchemeSettings from './ColorSchemeSettings'
import FeedSettings from './FeedSettings'
import LocaleSettings from './LocaleSettings'
import SlideAnimationSettings from './SlideAnimationSettings'
import TabColorSettings from './TabColorSettings'

function SettingsModal() {
  const dispatch = useDispatch()
  const settings = useSelector(selectSettings)

  const throttledUpdateSettings = throttle(
    (update: Partial<Settings>) => dispatch(updateSettingsAction(update)),
    100
  )

  const props = { settings, throttledUpdateSettings }

  return (
    <ModalInner icon={<IconSettings />} title="Settings">
      <Stack gap="md">
        <Divider label="Appearance" />
        <ColorSchemeSettings />
        <TabColorSettings {...props} />
        <SlideAnimationSettings {...props} />
        <Divider label="Feeds" />
        <FeedSettings {...props} />
        <Divider label="Locale Settings" />
        <LocaleSettings {...props} />
      </Stack>
    </ModalInner>
  )
}

export default SettingsModal
