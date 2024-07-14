import { ActionIcon, Button, CopyButton, FileButton, Group, Stack, TextInput } from '@mantine/core'
import {
  IconArrowsUpDown,
  IconCheck,
  IconCopy,
  IconDownload,
  IconPackageImport,
  IconUpload,
} from '@tabler/icons-react'
import { useRef, useState } from 'react'

import { importSettings } from '#store/slices/app/actions'
import { selectSettingsExport } from '#store/slices/settings/selectors'
import InputWrapper from '#ui/components/common/InputWrapper/InputWrapper'
import ModalInner from '#ui/components/common/ModalInner'
import Tooltip from '#ui/components/common/Tooltip'
import { useDispatch, useSelector } from '#ui/hooks/store'

import classes from './ImportExportModal.module.css'

function ImportExportModal() {
  const dispatch = useDispatch()
  const [importText, setImportText] = useState('')
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)
  const exportValue = useSelector(selectSettingsExport)

  const downloadSettings = () => {
    if (downloadLinkRef.current) {
      const data = new Blob([exportValue], { type: 'application/json' })
      const url = window.URL.createObjectURL(data)
      downloadLinkRef.current.href = url
      downloadLinkRef.current.setAttribute('download', 'newsdash_settings.json')
      downloadLinkRef.current.click()
      window.URL.revokeObjectURL(url)
    }
  }

  const dispatchImport = (data: string) => {
    dispatch(importSettings(data))
  }

  const handleSettingsUpload = (file: File | null) => {
    if (file) {
      file
        .text()
        .then(dispatchImport)
        .catch((error: unknown) => {
          console.error(error)
        })
    }
  }

  return (
    <ModalInner icon={<IconArrowsUpDown />} title="Import/Export Settings">
      <Stack gap="md">
        <InputWrapper
          help="To back up your layout and feed settings, copy the text or save it as a file."
          label="Export"
        >
          <Stack gap="xs">
            <Button
              color="green"
              fullWidth
              leftSection={<IconDownload className={classes.icon} />}
              onClick={downloadSettings}
              variant="filled"
            >
              Download Settings
            </Button>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a ref={downloadLinkRef} style={{ display: 'none' }}>
              Download
            </a>
            <Group gap="xs">
              <TextInput flex="1" readOnly value={exportValue} />
              <CopyButton value={exportValue} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy Settings'}>
                    <ActionIcon
                      aria-label="Copy Settings"
                      color={copied ? 'teal' : 'blue'}
                      onClick={copy}
                      size="lg"
                      variant="filled"
                    >
                      {copied ? (
                        <IconCheck className={classes.icon} />
                      ) : (
                        <IconCopy className={classes.icon} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Stack>
        </InputWrapper>
        <InputWrapper
          help="To import your settings, paste the text into the input field or upload your settings file (previous settings will be overwritten)."
          label="Import"
        >
          <Stack gap="xs">
            <FileButton onChange={handleSettingsUpload} accept="application/json">
              {(props) => (
                <Button
                  color="red"
                  fullWidth
                  leftSection={<IconUpload className={classes.icon} />}
                  variant="filled"
                  {...props}
                >
                  Upload Settings
                </Button>
              )}
            </FileButton>
            <Group gap="xs">
              <TextInput
                flex="1"
                onChange={(event) => {
                  setImportText(event.target.value)
                }}
              />
              <Tooltip disabled={importText.length === 0} label="Import Settings">
                <ActionIcon
                  aria-label="Import Settings"
                  color="red"
                  disabled={importText.length === 0}
                  onClick={() => {
                    dispatchImport(importText)
                  }}
                  size="lg"
                  variant="filled"
                >
                  <IconPackageImport className={classes.icon} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Stack>
        </InputWrapper>
      </Stack>
    </ModalInner>
  )
}

export default ImportExportModal
