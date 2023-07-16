import { Modal as MantineModal, useMantineTheme } from '@mantine/core'
import type { ReactNode } from 'react'

import { closeModal } from '#store/slices/app/actions'
import { selectIsModalOpen } from '#store/slices/app/selectors'
import type { RootState } from '#store/types'
import type { ModalName } from '#types/types'
import { useDispatch, useSelector } from '#ui/hooks/store'

function Modal({ children, icon, name, title }: ModalProps) {
  const dispatch = useDispatch()
  const selectIsOpen = (state: RootState) => selectIsModalOpen(state, name)
  const opened = useSelector(selectIsOpen)
  const theme = useMantineTheme()

  return (
    <MantineModal.Root
      centered
      keepMounted={false}
      onClose={() => dispatch(closeModal(name))}
      opened={opened}
      size="md"
    >
      <MantineModal.Overlay
        color={theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[9]}
        opacity={0.7}
        blur={3}
      />
      <MantineModal.Content>
        <MantineModal.Header>
          {icon}
          {title ? (
            <MantineModal.Title fz="xl" pl="xs">
              {title}
            </MantineModal.Title>
          ) : undefined}
          <MantineModal.CloseButton />
        </MantineModal.Header>
        <MantineModal.Body>{children}</MantineModal.Body>
      </MantineModal.Content>
    </MantineModal.Root>
  )
}

interface ModalProps {
  children: ReactNode
  icon?: ReactNode
  name: ModalName
  title?: string
}

export default Modal
