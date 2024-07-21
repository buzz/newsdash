import { useState } from 'react'

function FailableImage({ alt, className, src }: FailableImageProps) {
  const [imgFailed, setImgFailed] = useState(false)

  return !imgFailed && src !== undefined ? (
    <img
      alt={alt}
      className={className}
      onError={() => {
        setImgFailed(true)
      }}
      src={src}
    />
  ) : null
}

interface FailableImageProps {
  alt: string
  className?: string
  src?: string
}

export default FailableImage
