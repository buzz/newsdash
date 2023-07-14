import Modal from '#ui/components/common/Modal'

import SettingsForm from './SettingsForm'

function SettingsModal() {
  return (
    <Modal name="settings" title="Settings">
      <SettingsForm />
    </Modal>
  )
}

export default SettingsModal
