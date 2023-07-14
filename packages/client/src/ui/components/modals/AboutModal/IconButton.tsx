import { ActionIcon } from '@mantine/core'
import type { ReactNode } from 'react'

import Tooltip from '#ui/components/common/Tooltip'

function IconButton({ children, href, tooltip }: IconButtonProps) {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon component="a" href={href} target="_blank" rel="noreferrer" variant="subtle">
        {children}
      </ActionIcon>
    </Tooltip>
  )
}

interface IconButtonProps {
  children: ReactNode
  href: string
  tooltip: string
}

export default IconButton
