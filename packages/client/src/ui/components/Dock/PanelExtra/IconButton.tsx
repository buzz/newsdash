import { ActionIcon, type ActionIconProps } from '@mantine/core'
import type { MouseEvent, ReactNode } from 'react'

function IconButton({ icon, ...otherProps }: IconButtonProps) {
  return (
    <ActionIcon size="xs" variant="transparent" {...otherProps}>
      {icon}
    </ActionIcon>
  )
}

interface IconButtonProps {
  color?: ActionIconProps['color']
  icon: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default IconButton
