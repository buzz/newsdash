import { ActionIcon } from '@mantine/core'
import type { ActionIconProps } from '@mantine/core'
import type { MouseEventHandler } from 'react'

import Tooltip from '#ui/components/common/Tooltip'

function HeaderButton({ children, color, tooltip, variant, ...otherProps }: HeaderButtonProps) {
  const btn = (
    <ActionIcon
      color={color}
      variant={variant ?? (color ? 'filled' : 'default')}
      size={32}
      {...otherProps}
    >
      {children}
    </ActionIcon>
  )

  return tooltip ? <Tooltip label={tooltip}>{btn}</Tooltip> : btn
}

interface HeaderButtonProps extends ActionIconProps {
  onClick?: MouseEventHandler<HTMLButtonElement>
  tooltip?: string
}

export default HeaderButton
