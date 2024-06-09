import { z } from 'zod'

import type { RedisHashResult } from './redis.js'

const NULL_SYMBOL = '__NULL__'

/** Get list of schema fields */
function getSchemaFields(schema: z.SomeZodObject) {
  return Object.keys(schema.shape)
}

// { foo: '1', bar: '2' } => ['foo', '1', 'bar', '2']
function objToHmData(obj: Record<string, string | number | null | undefined>, hmFields: string[]) {
  const result = []
  for (const hmField of hmFields) {
    const value = obj[hmField]
    if (value === undefined) {
      continue
    }
    result.push(hmField, value === null ? NULL_SYMBOL : value.toString())
  }
  return result
}

// ['one', '2'] => { foo: 'one', bar: 2 }
function parseRedisHash(data: RedisHashResult, schema: z.SomeZodObject): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const [i, [fieldName, zodType]] of Object.entries(schema.shape).entries()) {
    const value = data.at(i)

    if (value === undefined) {
      throw new Error(`Received undefined for field ${fieldName}`)
    }

    // Redis value of `null` means not set, which translates to undefined
    if (value === null) {
      continue
    }

    // Null values are encoded using `NULL_SYMBOL`
    if (value === NULL_SYMBOL) {
      result[fieldName] = null
      continue
    }

    const isNumberType =
      zodType instanceof z.ZodNumber ||
      (zodType instanceof z.ZodOptional && zodType.unwrap() instanceof z.ZodNumber) ||
      (zodType instanceof z.ZodDefault && zodType.removeDefault() instanceof z.ZodNumber)

    result[fieldName] = zodType.parse(isNumberType ? Number.parseInt(value, 10) : value)
  }

  return result
}

export { getSchemaFields, objToHmData, parseRedisHash }
