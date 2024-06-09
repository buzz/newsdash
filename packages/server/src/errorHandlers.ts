import type { ErrorRequestHandler } from 'express'
import type { RequestError } from 'got'

function isArbitraryObject(thing: unknown): thing is object {
  return typeof thing === 'object' && thing !== null
}

function isError(thing: unknown): thing is Error {
  return isArbitraryObject(thing) && typeof (thing as Error).message === 'string'
}

function isRequestError(thing: unknown): thing is RequestError {
  return isArbitraryObject(thing) && typeof (thing as RequestError).code === 'string'
}

const consoleLogger: ErrorRequestHandler = (err, req, res, next) => {
  if (isError(err)) {
    console.error(err.stack)
  }
  next(err)
}

const errCodeMatcher: ErrorRequestHandler = (err, req, res, next) => {
  if (isRequestError(err)) {
    switch (err.code) {
      case 'ENOTFOUND': {
        res.status(530)
        res.json({ error: err.message })
        break
      }
      case 'ETIMEDOUT': {
        res.status(504)
        res.json({ error: err.message })
        break
      }
      default: {
        break
      }
    }
  }
  next(err)
}

const errorHandlers = [errCodeMatcher]
if (process.env.NODE_ENV !== 'production') {
  errorHandlers.unshift(consoleLogger)
}

export default errorHandlers
