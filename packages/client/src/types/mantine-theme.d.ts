import '@mantine/core'

declare module '@mantine/core' {
  export interface MantineThemeOther {
    transition: {
      duration: {
        default: number
        short: number
      }
      timingFunction: string
    }
  }
}
