import { z } from 'zod'

import type { RedisHashElementType, RedisHashResult } from './redis.js'

const NULL_SYMBOL = '__NULL__'

/** Check if `thing` is of specific type (unwrapping optional/default) */
function isZodType(thing: unknown, zodType: 'boolean' | 'number') {
  if (thing instanceof (zodType == 'boolean' ? z.ZodBoolean : z.ZodNumber)) {
    return true
  }

  if (thing instanceof z.ZodOptional && isZodType(thing.unwrap(), zodType)) {
    return true
  }

  if (thing instanceof z.ZodDefault && isZodType(thing.removeDefault(), zodType)) {
    return true
  }

  return false
}

/** Get list of schema fields */
function getSchemaFields(schema: z.SomeZodObject) {
  return Object.keys(schema.shape)
}

// { foo: '1', bar: '2' } => ['foo', '1', 'bar', '2']
function objToHmData(obj: Record<string, RedisHashElementType | undefined>, hmFields: string[]) {
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
    }

    // Parse boolean
    else if (isZodType(zodType, 'boolean')) {
      result[fieldName] = zodType.parse(value === 'true')
    }

    // Parse integer
    else if (isZodType(zodType, 'number')) {
      result[fieldName] = zodType.parse(Number.parseInt(value, 10))
    }

    // Parse string
    else {
      result[fieldName] = zodType.parse(value)
    }
  }

  return result
}

export { getSchemaFields, objToHmData, parseRedisHash }
