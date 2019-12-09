// ['foo', ['bar', 'int']] -> ['foo', 'bar']
export const getHmFields = (fields) =>
  fields.reduce((acc, field) => {
    acc.push(Array.isArray(field) ? field[0] : field)
    return acc
  }, [])

// { foo: '1', bar: '2' } => ['foo', '1', 'bar', '2']
export const objToHmData = (obj, hmFields) =>
  hmFields.reduce((acc, field) => {
    acc.push(field, obj[field])
    return acc
  }, [])

// ['one', '2'] => { foo: 'one', bar: 2 } (fields=['foo', ['bar', 'int']])
export const translateRedisHash = (data, fields) =>
  fields.reduce((acc, field, i) => {
    if (Array.isArray(field)) {
      // convert string to type
      const [fieldName, type] = field
      if (type === 'int') {
        acc[fieldName] = parseInt(data[i], 10)
      }
    } else {
      // just string
      acc[field] = data[i]
    }
    return acc
  }, {})
