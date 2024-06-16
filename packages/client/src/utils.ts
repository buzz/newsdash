function isValidUrl(urlString: string) {
  try {
    const url = new URL(urlString)
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return null
    }
  } catch {
    // empty
  }
  return 'Invalid URL'
}

const getRandomHue = () => Math.floor(Math.random() * 360)

export { getRandomHue, isValidUrl }
