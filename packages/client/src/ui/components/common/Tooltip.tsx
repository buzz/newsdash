import { Tooltip as MantineTooltip, type TooltipProps } from '@mantine/core'

function Tooltip(props: TooltipProps) {
  return <MantineTooltip arrowSize={6} position="bottom" openDelay={500} withArrow {...props} />
}

export default Tooltip
