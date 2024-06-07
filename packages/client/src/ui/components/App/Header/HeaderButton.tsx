import type { ActionIconProps } from '@mantine/core'
import { ActionIcon } from '@mantine/core'
import type { MouseEventHandler } from 'react'

import Tooltip from '#ui/components/common/Tooltip'

function HeaderButton({ children, color, tooltip, variant, ...otherProps }: HeaderButtonProps) {
  let _variant = variant
  if (variant === undefined) {
    _variant = color ? 'filled' : 'default'
  }

  const btn = (
    <ActionIcon color={color} variant={_variant} size={32} {...otherProps}>
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
