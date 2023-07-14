import { Modal, useMantineTheme } from '@mantine/core'

import { changeSettingsModalOpened, selectSettingsModalOpened } from '#store/slices/appSlice'
import { useDispatch, useSelector } from '#ui/hooks/store'

import SettingsForm from './SettingsForm'

function SettingsModal() {
  const dispatch = useDispatch()
  const opened = useSelector(selectSettingsModalOpened)
  const theme = useMantineTheme()

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => dispatch(changeSettingsModalOpened(false))}
      size="md"
      title="Settings"
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[9],
        opacity: 0.4,
        blur: 1,
      }}
      withCloseButton={false}
    >
      <SettingsForm />
    </Modal>
  )
}

export default SettingsModal
