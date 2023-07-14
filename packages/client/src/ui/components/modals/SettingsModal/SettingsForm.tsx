import { Input } from '@mantine/core'

import ColorSchemeModeChooser from './ColorSchemeModeChooser'

function SettingsForm() {
  return (
    <form>
      <Input.Label mt="md">Color scheme</Input.Label>
      <ColorSchemeModeChooser />
    </form>
  )
}

export default SettingsForm
