import { Modal as MantineModal } from '@mantine/core'
import type { ComponentType } from 'react'

import { closeModal } from '#store/slices/app/actions'
import { selectModal } from '#store/slices/app/selectors'
import AboutModal from '#ui/components/modals/AboutModal/AboutModal'
import SettingsModal from '#ui/components/modals/SettingsModal/SettingsModal'
import { useDispatch, useSelector } from '#ui/hooks/store'
import type { ModalName } from '#types/types'

import classes from './Modal.module.css'

const MODAL_MAPPING: Record<ModalName, ComponentType> = {
  about: AboutModal,
  settings: SettingsModal,
}

function Modal() {
  const dispatch = useDispatch()
  const modalName = useSelector(selectModal)

  if (!modalName) {
    return null
  }

  const ModalComponent = MODAL_MAPPING[modalName]

  return (
    <MantineModal.Root centered onClose={() => dispatch(closeModal())} opened>
      <MantineModal.Overlay blur={2} />
      <MantineModal.Content className={classes.modalContent} radius="md" shadow="xl">
        <ModalComponent />
      </MantineModal.Content>
    </MantineModal.Root>
  )
}

export default Modal
