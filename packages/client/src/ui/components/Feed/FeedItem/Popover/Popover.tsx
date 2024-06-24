import { AspectRatio, Group, Image, Popover as MantinePopover, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'
import type { MouseEventHandler } from 'react'

import selectSettings from '#store/slices/settings/selectors'
import { useSelector } from '#ui/hooks/store'

import classes from './Popover.module.css'

const OPEN_DELAY = 500

function formatDateTime(isoDate: string, locale?: string, hour12 = false) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
    hour12,
  }).format(Date.parse(isoDate))
}

function Popover({ children, content, date, imageUrl, language, title }: PopoverProps) {
  const { dateLocale, dateHour12 } = useSelector(selectSettings)
  const [opened, { close, open }] = useDisclosure(false)
  const [openTimeout, setOpenTimeout] = useState<number | undefined>()

  const image = imageUrl ? (
    <AspectRatio className={classes.image} ratio={20 / 15} w={300}>
      <Image src={imageUrl} />
    </AspectRatio>
  ) : null

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
      <MantinePopover.Target>{children({ onMouseEnter, onMouseLeave })}</MantinePopover.Target>
      <MantinePopover.Dropdown className={classes.popover}>
        <Group className={classes.flexWrap} wrap="nowrap">
          {image}
          <Stack gap="xs">
            {title.length > 0 ? <Text className={classes.title}>{title}</Text> : null}
            <Text fs="italic" size="sm">
              {formatDateTime(date, dateLocale, dateHour12)}
            </Text>
            {content ? (
              <Text className={classes.content} lang={language} size="sm">
                {content}
              </Text>
            ) : null}
          </Stack>
        </Group>
      </MantinePopover.Dropdown>
    </MantinePopover>
  )
}

interface PopoverProps {
  children: ({
    onMouseEnter,
    onMouseLeave,
  }: {
    onMouseEnter: MouseEventHandler<HTMLAnchorElement>
    onMouseLeave: MouseEventHandler<HTMLAnchorElement>
  }) => JSX.Element
  content?: string
  date: string
  imageUrl?: string
  language?: string
  title: string
}

export default Popover
