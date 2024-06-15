import { AspectRatio, Group, Image, Popover as MantinePopover, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type ReactNode, useState } from 'react'

import classes from './Popover.module.css'

const OPEN_DELAY = 500

function Popover({ children, content, imageUrl, title }: PopoverProps) {
  const [opened, { close, open }] = useDisclosure(false)
  const [openTimeout, setOpenTimeout] = useState<number | undefined>()

  const image = imageUrl ? (
    <AspectRatio className={classes.image} ratio={20 / 15} w={300}>
      <Image src={imageUrl} />
    </AspectRatio>
  ) : null

  const contentText = content ? <Text size="sm">{content}</Text> : null

  const onMouseEnter = () => {
    setOpenTimeout(setTimeout(open, OPEN_DELAY))
  }

  const onMouseLeave = () => {
    if (openTimeout) {
      clearTimeout(openTimeout)
    }
    close()
  }

  return (
    <MantinePopover
      arrowSize={10}
      keepMounted={false}
      opened={opened}
      shadow="md"
      width={600}
      withArrow
    >
      <MantinePopover.Target>
        <div
          className={classes.targetWrapper}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </div>
      </MantinePopover.Target>
      <MantinePopover.Dropdown className={classes.popover}>
        <Group className={classes.flexWrap} wrap="nowrap">
          {image}
          <div>
            <Text className={classes.title} fw={700} mb="xs">
              {title}
            </Text>
            {contentText}
          </div>
        </Group>
      </MantinePopover.Dropdown>
    </MantinePopover>
  )
}

interface PopoverProps {
  children: ReactNode
  content?: string
  imageUrl?: string
  title: string
}

export default Popover
