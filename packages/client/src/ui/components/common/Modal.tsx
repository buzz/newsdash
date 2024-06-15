import { Modal as MantineModal } from '@mantine/core'
import type { ReactNode } from 'react'

import { closeModal } from '#store/slices/app/actions'
import { selectIsModalOpen } from '#store/slices/app/selectors'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { RootState } from '#store/types'
import type { ModalName } from '#types/types'

import classes from './common.module.css'

function Modal({ children, icon, name, title }: ModalProps) {
  const dispatch = useDispatch()
  const selectIsOpen = (state: RootState) => selectIsModalOpen(state, name)
  const opened = useSelector(selectIsOpen)

  return (
    <MantineModal.Root
      centered
      keepMounted={false}
      onClose={() => dispatch(closeModal(name))}
      opened={opened}
    >
      <MantineModal.Overlay blur={2} />
      <MantineModal.Content className={classes.modalContent} radius="md" shadow="xl">
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
