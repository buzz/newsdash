import { Stack } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { throttle } from 'lodash-es'

import { updateSettings as updateSettingsAction } from '#store/slices/settings/actions'
import selectSettings from '#store/slices/settings/selectors'
import Divider from '#ui/components/common/Divider/Divider'
import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import ModalInner from '#ui/components/common/ModalInner'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { Settings } from '#types/types'

import ColorSchemeModeChooser from './ColorSchemeModeChooser'
import FeedSettings from './FeedSettings'
import TabColorSettings from './TabColorSettings'

function SettingsModal() {
  const dispatch = useDispatch()
  const settings = useSelector(selectSettings)

  const throttledUpdateSettings = throttle(
    (update: Partial<Settings>) => dispatch(updateSettingsAction(update)),
    100
  )

  return (
    <ModalInner icon={<IconSettings />} title="Settings">
      <Stack gap="md">
        <InputWrapper label="Color Scheme">
          <ColorSchemeModeChooser />
        </InputWrapper>
        <Divider label="Tab Colors" />
        <TabColorSettings settings={settings} throttledUpdateSettings={throttledUpdateSettings} />
        <Divider label="Feeds" />
        <FeedSettings settings={settings} throttledUpdateSettings={throttledUpdateSettings} />
      </Stack>
    </ModalInner>
  )
}

export default SettingsModal
