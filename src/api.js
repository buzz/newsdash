import Parser from 'rss-parser'

const parser = new Parser()

const fetchFeed = async (url, corsProxy) => parser.parseURL(`${corsProxy}${url}`)

export default fetchFeed
