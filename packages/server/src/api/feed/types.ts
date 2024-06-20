import type { FastifyRequest } from 'fastify'
import type RssParser from 'rss-parser'

interface UrlQueryString {
  url?: string
}

type UrlRequest = FastifyRequest<{ Querystring: UrlQueryString }>

interface CustomFeedFields {
  language?: string
}

type RssParserResult = Awaited<ReturnType<RssParser<CustomFeedFields>['parseString']>>

export type { CustomFeedFields, RssParserResult, UrlRequest }
