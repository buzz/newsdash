export const actionTypes = {
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  IMPORT_STATE: 'IMPORT_STATE',
}

export const updateSettings = (settings) => ({
  type: actionTypes.UPDATE_SETTINGS,
  settings,
})

export const importState = (orm) => ({
  type: actionTypes.IMPORT_STATE,
  orm,
})
