import { AspectRatio, Group, HoverCard, Image, Text } from '@mantine/core'
import type { ReactNode } from 'react'

import classes from './Popover.module.css'

function Popover({ children, content, imageUrl, title }: HoverCardProps) {
  const image = imageUrl ? (
    <AspectRatio className={classes.image} ratio={20 / 15} w={300}>
      <Image src={imageUrl} />
    </AspectRatio>
  ) : null

  const contentText = content ? <Text size="sm">{content}</Text> : null

  return (
    <HoverCard arrowSize={10} openDelay={500} shadow="md" width={600} withArrow>
      <HoverCard.Target>{children}</HoverCard.Target>
      <HoverCard.Dropdown className={classes.popover}>
        <Group className={classes.flexWrap} wrap="nowrap">
          {image}
          <div>
            <Text className={classes.title} fw={700} mb="xs">
              {title}
            </Text>
            {contentText}
          </div>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

interface HoverCardProps {
  children: ReactNode
  content?: string
  imageUrl?: string
  title: string
}

export default Popover
