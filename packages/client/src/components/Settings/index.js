import React from 'react'
import PropTypes from 'prop-types'

import ApiCheck from './ApiCheck'
import AppSettings from './AppSettings'
import ImportExport from './ImportExport'
import css from './Settings.sass'

const Settings = ({ setShowModal }) => (
  <div className={css.settings}>
    <AppSettings />
    <ImportExport setShowModal={setShowModal} />
    <ApiCheck />
  </div>
)

Settings.propTypes = {
  setShowModal: PropTypes.func.isRequired,
}

export default Settings
