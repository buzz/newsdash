import createError from '@fastify/error'

const BadGateway = createError('BAD_GATEWAY', 'Bad Gateway:', 502)

const NotFound = createError('FST_ERR_NOT_FOUND', 'Not Found', 404)

const BadRequest = createError('BAD_REQUEST', 'Bad Request:', 400)

const ParseError = createError('PARSE_ERROR', 'Parse Error:', 500)

const ServerError = createError('INTERNAL_SERVER_ERROR', 'Internal Server Error:', 500)

function isError(thing: unknown): thing is Error {
  return thing !== null && typeof thing === 'object' && typeof (thing as Error).message === 'string'
}

export { BadGateway, BadRequest, isError, NotFound, ParseError, ServerError }
