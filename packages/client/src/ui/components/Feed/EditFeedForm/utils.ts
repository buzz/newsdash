export function isValidUrl(urlString: string) {
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

export const randomColor = () => `#${Math.floor(Math.random() * 16_777_215).toString(16)}`
