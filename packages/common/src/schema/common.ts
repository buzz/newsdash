import { z } from 'zod'

const webUrlSchema = z
  .string()
  .url()
  .refine((url) => url.startsWith('http'), { message: 'URL must start with http or https.' })

export { webUrlSchema }
