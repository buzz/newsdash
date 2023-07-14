import { Modal as MantineModal, useMantineTheme } from '@mantine/core'
import type { ReactNode } from 'react'

import type { RootState } from '#store/makeStore'
import { closeModal, selectIsModalOpen } from '#store/slices/appSlice'
import type { ModalName } from '#types/types'
import { useDispatch, useSelector } from '#ui/hooks/store'

function Modal({ children, name, title }: ModalProps) {
  const dispatch = useDispatch()
  const selectIsOpen = (state: RootState) => selectIsModalOpen(state, name)
  const opened = useSelector(selectIsOpen)
  const theme = useMantineTheme()

  return (
    <MantineModal
      centered
      opened={opened}
      onClose={() => dispatch(closeModal(name))}
      size="md"
      title={title}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[9],
        opacity: 0.4,
        blur: 1,
      }}
    >
      {children}
    </MantineModal>
  )
}

interface ModalProps {
  children: ReactNode
  name: ModalName
  title?: string
}

export default Modal
