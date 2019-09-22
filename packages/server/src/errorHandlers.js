const consoleLogger = (err, req, res, next) => {
  console.error(err.stack)
  next(err)
}

const errCodeMatcher = (err, req, res, next) => {
  let statusCode
  switch (err.code) {
    case 'ENOTFOUND': {
      statusCode = 530
      break
    }
    case 'ETIMEDOUT': {
      statusCode = 504
      break
    }
    default:
      break
  }
  if (statusCode) {
    const newError = new Error()
    newError.statusCode = statusCode
    next(newError)
  } else {
    next(err)
  }
}

const statusCodeSetter = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  const statusCode = err.statusCode || 500
  res.status(statusCode)
  res.json({ error: err.message })
  return undefined
}

const errorHandlers = [errCodeMatcher, statusCodeSetter]
if (process.env.NODE_ENV !== 'production') {
  errorHandlers.unshift(consoleLogger)
}

export default errorHandlers
