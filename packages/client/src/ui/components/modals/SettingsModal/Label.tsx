import { Box, Center } from '@mantine/core'
import type { Icon } from '@tabler/icons-react'

function Label({ icon: Icon, text }: LabelProps) {
  return (
    <Center>
      <Icon size="1rem" />
      <Box ml={10}>{text}</Box>
    </Center>
  )
}

interface LabelProps {
  icon: Icon
  text: string
}

export default Label
