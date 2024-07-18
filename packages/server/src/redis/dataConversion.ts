import { z } from 'zod'

import type { RedisHashResult, RedisObject } from './redis.js'

const NULL_SYMBOL = '__NULL__'

/** Get list of schema fields */
function getSchemaFields(schema: z.SomeZodObject) {
  return new Set(Object.keys(schema.shape))
}

// { foo: '1', bar: '2' } => ['foo', '1', 'bar', '2']
function objToHmData(obj: RedisObject, hmFields: Set<string>) {
  const result = []
  for (const hmField of hmFields) {
    const value = obj[hmField]
    if (value === undefined) {
      continue
    }
    let stringValue: string
    if (value === null) {
      stringValue = NULL_SYMBOL
    } else if (Array.isArray(value)) {
      stringValue = JSON.stringify(value)
    } else {
      stringValue = value.toString()
    }
    result.push(hmField, stringValue)
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

    // Parse array value
    else if (isZodType(zodType, 'array')) {
      result[fieldName] = JSON.parse(value)
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

/** Check if `thing` is of specific type (supports optional/default) */
function isZodType(thing: unknown, zodType: 'array' | 'boolean' | 'number'): boolean {
  return (
    (zodType === 'array' && thing instanceof z.ZodArray) ||
    (zodType === 'boolean' && thing instanceof z.ZodBoolean) ||
    (zodType === 'number' && thing instanceof z.ZodNumber) ||
    // unwrap nested zod types
    (thing instanceof z.ZodOptional && isZodType(thing.unwrap(), zodType)) ||
    (thing instanceof z.ZodDefault && isZodType(thing.removeDefault(), zodType))
  )
}

export { getSchemaFields, objToHmData, parseRedisHash }
