import { ActionIcon } from '@mantine/core'
import type { ActionIconVariant } from '@mantine/core'
import type { ReactNode } from 'react'

import Tooltip from '#ui/components/common/Tooltip'

function IconButton({
  children,
  className,
  href,
  onClick,
  tooltip,
  variant = 'subtle',
}: IconButtonProps) {
  const actionIcon = (
    <ActionIcon
      className={className}
      component="a"
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noreferrer"
      variant={variant}
    >
      {children}
    </ActionIcon>
  )

  return tooltip ? <Tooltip label={tooltip}>{actionIcon}</Tooltip> : actionIcon
}

interface IconButtonProps {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  tooltip?: string
  variant?: ActionIconVariant
}

export default IconButton
