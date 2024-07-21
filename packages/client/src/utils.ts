import type { z } from 'zod'

import { UNKNOWN_ERROR_MESSAGE } from '@newsdash/common/constants'
import type { Tab } from '@newsdash/common/schema'

function getRandomHue() {
  return Math.floor(Math.random() * 360)
}

function getTitle({ customTitle, status, title }: Tab, feedItemCount?: number) {
  if (status === 'new') {
    return 'Add Feed'
  }

  let displayTitle = 'NO TITLE'
  if (customTitle.length > 0) {
    displayTitle = customTitle
  } else if (title !== undefined && title.length > 0) {
    displayTitle = title
  }
  return feedItemCount ? `${displayTitle} (${feedItemCount})` : displayTitle
}

function zodErrorToString<T>(error: z.ZodError<T>) {
  return error.issues.at(0)?.message ?? UNKNOWN_ERROR_MESSAGE
}

export { getRandomHue, getTitle, zodErrorToString }
