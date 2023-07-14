import { ActionIcon } from '@mantine/core'
import type { MouseEventHandler, ReactNode } from 'react'

import Tooltip from '#ui/components/common/Tooltip'

function HeaderButton({ children, onClick, tooltip }: HeaderButtonProps) {
  const btn = (
    <ActionIcon variant="default" onClick={onClick} size={32}>
      {children}
    </ActionIcon>
  )

  return tooltip ? <Tooltip label={tooltip}>{btn}</Tooltip> : btn
}

interface HeaderButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  tooltip?: string
}

export default HeaderButton
