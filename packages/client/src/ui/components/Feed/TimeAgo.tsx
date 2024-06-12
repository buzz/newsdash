import { useEffect, useState } from 'react'
import { format } from 'timeago.js'

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

export default TimeAgo
