import { Modal } from '@mantine/core'
import type { ReactNode } from 'react'

function ModalInner({ children, icon = null, title }: ModalInnerProps) {
  return (
    <>
      <Modal.Header>
        {icon}
        {title ? (
          <Modal.Title fz="xl" pl="xs">
            {title}
          </Modal.Title>
        ) : undefined}
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </>
  )
}

interface ModalInnerProps {
  children: ReactNode
  icon?: ReactNode
  title?: string
}

export default ModalInner
