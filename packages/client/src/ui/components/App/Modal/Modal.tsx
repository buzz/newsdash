import { Modal as MantineModal, useMantineTheme } from '@mantine/core'
import type { ComponentType } from 'react'

import { DEFAULT_BLUR } from '#constants'
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

function getModalComponent(name: ModalName | null) {
  return name === null ? () => null : MODAL_MAPPING[name]
}

function Modal() {
  const dispatch = useDispatch()
  const modalName = useSelector(selectModal)
  const {
    other: { transition },
  } = useMantineTheme()

  const ModalComponent = getModalComponent(modalName)

  return (
    <MantineModal.Root
      centered
      onClose={() => dispatch(closeModal())}
      opened={modalName !== null}
      transitionProps={{
        transition: 'fade',
        duration: transition.duration.short,
        timingFunction: transition.timingFunction,
      }}
    >
      <MantineModal.Overlay blur={DEFAULT_BLUR} />
      <MantineModal.Content className={classes.modalContent} miw={280} radius="md" shadow="xl">
        <ModalComponent />
      </MantineModal.Content>
    </MantineModal.Root>
  )
}

export default Modal
