import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'

import getSettingsExport from 'newsdash/store/selectors/getSettingsExport'
import { importState } from 'newsdash/store/actions/app'
import ConfirmButton from 'newsdash/components/ConfirmButton'
import css from 'newsdash/components/Settings/Settings.sass'

const ImportExport = ({ setShowSettings }) => {
  const dispatch = useDispatch()
  const ormState = useSelector(getSettingsExport)
  const [importData, setImportData] = useState()

  const doImport = () => {
    try {
      dispatch(importState(JSON.parse(importData)))
      setShowSettings(false)
    } catch {
      // TODO handle JSON error
    }
  }

  return (
    <>
      <h1>Import/Export</h1>
      <form>
        <div className={classNames(css.row, css.rowFull)}>
          <p>
            You can transfer your settings to another computer by copying it
            from the export field and pasting it into the input field.
          </p>
        </div>

        <div className={css.row}>
          <label htmlFor="importInput">Import</label>
          <div className={css.inputAndButton}>
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

        <div className={css.row}>
          <label htmlFor="exportInput">Export</label>
          <input
            id="exportInput"
            onFocus={(ev) => ev.target.select()}
            readOnly
            type="text"
            value={JSON.stringify(ormState)}
          />
        </div>
      </form>
    </>
  )
}

ImportExport.propTypes = {
  setShowSettings: PropTypes.func.isRequired,
}

export default ImportExport
