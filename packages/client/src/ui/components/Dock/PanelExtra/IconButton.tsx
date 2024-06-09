import { ActionIcon, type ActionIconProps } from '@mantine/core'
import type { ComponentProps, MouseEvent, ReactNode } from 'react'

function IconButton({ icon, label, ...otherProps }: IconButtonProps) {
  return (
    <ActionIcon aria-label={label} size="xs" title={label} variant="transparent" {...otherProps}>
      {icon}
    </ActionIcon>
  )
}

interface IconButtonProps extends ComponentProps<typeof ActionIcon> {
  color?: ActionIconProps['color']
  icon: ReactNode
  label: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default IconButton
