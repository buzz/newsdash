import { Modal } from '@mantine/core'
import type { ReactNode } from 'react'

import Scroller from '#ui/components/common/Scroller/Scroller'

import classes from './Modal.module.css'

function ModalInner({ children, icon = null, title }: ModalInnerProps) {
  return (
    <div className={classes.scrollWrapper}>
      <Scroller>
        <div className={classes.content}>
          <Modal.Header className={classes.header}>
            {icon}
            {title ? (
              <Modal.Title fz="xl" pl="xs">
                {title}
              </Modal.Title>
            ) : undefined}
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className={classes.body}>{children}</Modal.Body>
        </div>
      </Scroller>
    </div>
  )
}

interface ModalInnerProps {
  children: ReactNode
  icon?: ReactNode
  title?: string
}

export default ModalInner
