import '@mantine/core'

declare module '@mantine/core' {
  export interface MantineThemeOther {
    transition: {
      duration: {
        default: number
        fast: number
      }
    }
  }
}
