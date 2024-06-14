import { Tooltip as MantineTooltip, type TooltipProps } from '@mantine/core'

import classes from './common.module.css'

function Tooltip(props: TooltipProps) {
  return (
    <MantineTooltip
      arrowSize={6}
      className={classes.tooltip}
      position="bottom"
      openDelay={500}
      withArrow
      {...props}
    />
  )
}

export default Tooltip
