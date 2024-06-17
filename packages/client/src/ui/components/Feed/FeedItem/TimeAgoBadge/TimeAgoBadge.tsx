import { Badge } from '@mantine/core'
import cx from 'clsx'
import { useEffect, useState } from 'react'
import { format } from 'timeago.js'

import type { FeedItem } from '#types/feed'

import classes from './TimeAgoBadge.module.css'

const UPDATE_INTERVAL = 15_000

const timeAgoFormat = (date: string) =>
  format(date)
    .replace(/minutes?/, 'min')
    .replace(/hours?/, 'h')
    .replace(' ago', '')

const TimeAgo = ({ date }: TimeAgoProps) => {
  const [timeAgo, setTimeAgo] = useState(timeAgoFormat(date))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(timeAgoFormat(date))
    }, UPDATE_INTERVAL)

    return () => {
      clearInterval(interval)
    }
  }, [date])

  return <>{timeAgo}</>
}

interface TimeAgoProps {
  date: string
}

function TimeAgoBadge({ className, feedItem }: TimeAgoBadgeProps) {
  return (
    <Badge
      className={cx(classes.badge, className, { [classes.new]: feedItem.new })}
      radius="sm"
      size="sm"
    >
      <TimeAgo date={feedItem.date} />
    </Badge>
  )
}

interface TimeAgoBadgeProps {
  className?: string
  feedItem: FeedItem
}

export default TimeAgoBadge
