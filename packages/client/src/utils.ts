import type { z } from 'zod'

function getRandomHue() {
  return Math.floor(Math.random() * 360)
}

function zodErrorToString<T>(error: z.ZodError<T>) {
  return error.issues.at(0)?.message ?? 'Unknown error'
}

export { getRandomHue, zodErrorToString }
