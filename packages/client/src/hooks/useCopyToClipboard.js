const fallbackCopyToClipboard = (text) => {
  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.style.clip = 'rect(0, 0, 0, 0)'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    document.execCommand('copy')
  } catch (err) {
    // do nothing
  } finally {
    document.body.removeChild(textArea)
  }
}

const useCopyToClipboard = () => (text) => {
  if (!navigator.clipboard) {
    fallbackCopyToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text)
}

export default useCopyToClipboard
