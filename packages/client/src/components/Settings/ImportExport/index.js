import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faExclamationTriangle, faFileImport } from '@fortawesome/free-solid-svg-icons'

import useCopyToClipboard from 'newsdash/hooks/useCopyToClipboard'
import getSettingsExport from 'newsdash/store/selectors/getSettingsExport'
import { importSettings } from 'newsdash/store/actions/app'
import ConfirmButton from 'newsdash/components/ConfirmButton'
import settingsCss from 'newsdash/components/Settings/Settings.sass'
import css from './ImportSettings.sass'

const ImportExport = ({ setShowSettings }) => {
  const copyToClipboard = useCopyToClipboard()
  const dispatch = useDispatch()
  const settingsExport = useSelector(getSettingsExport)
  const [importData, setImportData] = useState()

  const settingsExportJson = JSON.stringify(settingsExport)

  const doImport = () => {
    dispatch(importSettings(importData))
    setShowSettings(false)
  }

  return (
    <>
      <h1>Import/Export</h1>
      <form>
        <div className={classNames(settingsCss.row, settingsCss.rowFull)}>
          <p>
            Here you can backup your personal settings and all your feeds.
            Copy the contents of the export field and save it to a file or
            transfer it to another computer.
          </p>
          <p className={css.warning}>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            The import will overwrite your settings and clear all your feeds!
          </p>
        </div>

        <div className={settingsCss.row}>
          <label htmlFor="exportInput">Export</label>
          <div className={settingsCss.inputAndButton}>
            <input
              id="exportInput"
              onFocus={(ev) => ev.target.select()}
              readOnly
              type="text"
              value={settingsExportJson}
            />
            <button
              onClick={() => copyToClipboard(settingsExportJson)}
              type="button"
            >
              <FontAwesomeIcon icon={faClipboard} />
              Copy
            </button>
          </div>
        </div>

        <div className={settingsCss.row}>
          <label htmlFor="importInput">Import</label>
          <div className={settingsCss.inputAndButton}>
            <input
              id="importInput"
              onChange={(ev) => setImportData(ev.currentTarget.value.trim())}
              type="text"
            />
            <ConfirmButton
              icon={faFileImport}
              onClick={doImport}
            >
              Import
            </ConfirmButton>
          </div>
        </div>
      </form>
    </>
  )
}

ImportExport.propTypes = {
  setShowSettings: PropTypes.func.isRequired,
}

export default ImportExport
