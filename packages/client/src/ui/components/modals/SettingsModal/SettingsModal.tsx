import { IconSettings } from '@tabler/icons-react'

import Modal from '#ui/components/common/Modal'

import SettingsForm from './SettingsForm'

function SettingsModal() {
  return (
    <Modal icon={<IconSettings />} name="settings" title="Settings">
      <SettingsForm />
    </Modal>
  )
}

export default SettingsModal
