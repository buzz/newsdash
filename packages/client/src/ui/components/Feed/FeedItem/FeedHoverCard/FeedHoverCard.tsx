import { Group, HoverCard, Stack, Text } from '@mantine/core'
import type { ReactNode } from 'react'

import selectSettings from '#store/slices/settings/selectors'
import { useSelector } from '#ui/hooks/store'

import classes from './FeedHoverCard.module.css'

const OPEN_DELAY = 500

function formatDateTime(isoDate: string, locale?: string, hour12?: boolean) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
    hour12,
  }).format(Date.parse(isoDate))
}

function FeedHoverCard({ children, content, date, imageUrl, language, title }: FeedHoverCardProps) {
  const { dateLocale, dateHour12 } = useSelector(selectSettings)

  return (
    <HoverCard
      arrowSize={10}
      keepMounted={false}
      openDelay={OPEN_DELAY}
      shadow="md"
      width={600}
      withArrow
    >
      <HoverCard.Target>{children}</HoverCard.Target>
      <HoverCard.Dropdown className={classes.hoverCard}>
        <Group className={classes.flexWrap} wrap="nowrap">
          {imageUrl && <img className={classes.image} alt={title} src={imageUrl} />}
          <Stack gap="xs">
            {title.length > 0 && <Text className={classes.title}>{title}</Text>}
            <Text fs="italic" size="sm">
              {formatDateTime(date, dateLocale, dateHour12)}
            </Text>
            {content && (
              <Text className={classes.content} lang={language} size="sm">
                {content}
              </Text>
            )}
          </Stack>
        </Group>
      </HoverCard.Dropdown>
    </HoverCard>
  )
}

interface FeedHoverCardProps {
  children: ReactNode
  content?: string
  date: string
  imageUrl?: string
  language?: string
  title: string
}

export default FeedHoverCard
