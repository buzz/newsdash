import type { z } from 'zod'

import type { Tab } from '@newsdash/common/schema'

function getRandomHue() {
  return Math.floor(Math.random() * 360)
}

function getTitle({ customTitle, status, title }: Tab) {
  if (status === 'new') {
    return 'Add Feed'
  }
  if (customTitle.length > 0) {
    return customTitle
  }
  if (title !== undefined && title.length > 0) {
    return title
  }
  return 'NO TITLE'
}

function zodErrorToString<T>(error: z.ZodError<T>) {
  return error.issues.at(0)?.message ?? 'Unknown error'
}

export { getRandomHue, getTitle, zodErrorToString }
