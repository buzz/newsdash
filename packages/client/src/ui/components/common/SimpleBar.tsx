import SimpleBarReact, { type Props as SimpleBarReactProps } from 'simplebar-react'

function SimpleBar({ children, height }: SimpleBarProps) {
  return (
    <SimpleBarReact
      clickOnTrack={false}
      style={{
        height: typeof height === 'number' ? `${height}px` : height,
        overflowX: 'hidden',
      }}
    >
      {children}
    </SimpleBarReact>
  )
}

interface SimpleBarProps {
  children: SimpleBarReactProps['children']
  height: number | string
}

export default SimpleBar
