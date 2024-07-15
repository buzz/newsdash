import { ActionIcon, SegmentedControl, TextInput } from '@mantine/core'
import { IconClock12, IconClock24, IconDeviceDesktop, IconX } from '@tabler/icons-react'
import { useState } from 'react'
import type { ChangeEventHandler } from 'react'

import { localeSchema } from '#types/schema'
import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import Tooltip from '#ui/components/common/Tooltip'
import { zodErrorToString } from '#utils'

import Label from './Label'
import type { SettingsProps } from './types'

const hour12Data = [
  {
    label: <Label icon={IconDeviceDesktop} text="Auto" />,
    value: 'auto',
  },
  {
    label: <Label icon={IconClock12} text="12 h" />,
    value: '12',
  },
  {
    label: <Label icon={IconClock24} text="24 h" />,
    value: '24',
  },
]

function LocaleSettings({ settings, throttledUpdateSettings }: SettingsProps) {
  const [dateHour12, setDateHour12] = useState(settings.dateHour12)
  const [dateLocale, setDateLocale] = useState(settings.dateLocale)
  const [dateLocaleError, setDateLocaleError] = useState<string | undefined>()

  const onHour12Change = (value: string) => {
    let setValue: boolean | undefined
    switch (value) {
      case '12': {
        setValue = true
        break
      }
      case '24': {
        setValue = false
        break
      }
    }
    setDateHour12(setValue)
    throttledUpdateSettings({ dateHour12: setValue })
  }

  let hour12Value = 'auto'
  switch (dateHour12) {
    case true: {
      hour12Value = '12'
      break
    }
    case false: {
      hour12Value = '24'
      break
    }
  }

  const onDateLocalChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (target.value) {
      const result = localeSchema.safeParse(target.value)
      if (result.success) {
        setDateLocale(result.data)
        throttledUpdateSettings({ dateLocale: result.data })
        setDateLocaleError(undefined)
        return
      } else {
        setDateLocaleError(zodErrorToString(result.error))
        setDateLocale(target.value)
      }
    } else {
      setDateLocale(undefined)
    }

    throttledUpdateSettings({ dateLocale: undefined })
  }

  return (
    <>
      <InputWrapper
        help="Specify hour format (12-hour, 24-hour, or system-dependent)."
        label="Hour Format"
      >
        <SegmentedControl
          data={hour12Data}
          fullWidth
          onChange={onHour12Change}
          value={hour12Value}
        />
      </InputWrapper>
      <InputWrapper help="Override date locale for custom date formatting." label="Date Locale">
        <TextInput
          error={dateLocaleError}
          placeholder={navigator.language}
          rightSection={
            <Tooltip disabled={!dateLocale} label="Clear">
              <ActionIcon
                color="red"
                disabled={!dateLocale}
                onClick={() => {
                  setDateLocale(undefined)
                  throttledUpdateSettings({ dateLocale: undefined })
                }}
                variant="subtle"
              >
                <IconX size="1rem" />
              </ActionIcon>
            </Tooltip>
          }
          spellCheck={false}
          onChange={onDateLocalChange}
          value={dateLocale ?? ''}
        />
      </InputWrapper>
    </>
  )
}

export default LocaleSettings
