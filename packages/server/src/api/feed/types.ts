import type { FastifyRequest } from 'fastify'
import type RssParser from 'rss-parser'

interface UrlQueryString {
  url?: string
}

type UrlRequest = FastifyRequest<{ Querystring: UrlQueryString }>

type RssParserResult = Awaited<ReturnType<RssParser['parseString']>>

export type { RssParserResult, UrlRequest }
