import { ActionIcon } from '@mantine/core'
import type { ReactNode } from 'react'

import Tooltip from '#ui/components/common/Tooltip'

import classes from './Panel.module.css'

function PanelButton({ children, disabled = false, label, onClick }: PanelButtonProps) {
  return (
    <Tooltip disabled={disabled} label={label}>
      <ActionIcon
        aria-label={label}
        className={classes.panelButton}
        disabled={disabled}
        onClick={onClick}
        size="xs"
        variant="transparent"
      >
        {children}
      </ActionIcon>
    </Tooltip>
  )
}

interface PanelButtonProps {
  children: ReactNode
  disabled?: boolean
  label: string
  onClick: () => void
}

export default PanelButton
