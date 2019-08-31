import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Parser from 'rss-parser'

import getApp from '../store/selectors/app'

const parser = new Parser()

const useFeed = (url) => {
  const { corsProxy } = useSelector(getApp)
  const [feed, setFeed] = useState({
    title: 'Loading…',
    items: [],
  })
  useEffect(() => {
    const fetchData = async () => {
      const data = await parser.parseURL(`${corsProxy}${url}`)
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
