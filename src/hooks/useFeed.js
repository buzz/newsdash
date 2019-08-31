import { useEffect, useState } from 'react'
import Parser from 'rss-parser'

import { CORS_PROXY } from '../constants'

const parser = new Parser()

const useFeed = (url) => {
  const [feed, setFeed] = useState({
    title: 'Loading…',
    items: [],
  })
  useEffect(() => {
    const fetchData = async () => {
      const data = await parser.parseURL(CORS_PROXY + url)
      setFeed(data)
      console.log(data)
      data.items.forEach((item) => {
        console.log(`${item.title}:${item.link}`)
        console.log(item)
      })
      console.log('-----------------------------------------')
    }
    fetchData()
  }, [url])
  return feed
}

export default useFeed
