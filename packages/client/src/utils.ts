import { formatDistanceToNowStrict } from 'date-fns'

function isValidUrl(urlString: string) {
  try {
    const url = new URL(urlString)
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return null
    }
  } catch {
    // empty
  }
  return 'Invalid URL'
}

const randomColor = () => `#${Math.floor(Math.random() * 16_777_215).toString(16)}`

function humanReadableDateTime(isoDate: string) {
  return formatDistanceToNowStrict(new Date(isoDate), {
    addSuffix: true,
    unit: 's',
    roundingMethod: 'floor',
    locale: {
      formatDistance: {
        lessThanXSeconds: '%ds',
        xSeconds: '%ds',
        aboutXMinutes: '%dmin',
        xMinutes: '%dmin',
        aboutXHours: '%dh',
        xHours: '%dh',
        xDays: '%dd',
        aboutXMonths: '%dmo',
        xMonths: '%dmo',
        aboutXYears: '%dy',
        xYears: '%dy',
        overXYears: '%dy',
      },
    },
  })
}

export { humanReadableDateTime, isValidUrl, randomColor }
