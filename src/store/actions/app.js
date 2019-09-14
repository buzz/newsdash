export const actionTypes = {
  IMPORT_STATE: 'IMPORT_STATE',
  LOAD_STATE: 'LOAD_STATE',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
}

export const importState = (data) => ({
  type: actionTypes.IMPORT_STATE,
  data,
})


export const loadState = (orm) => ({
  type: actionTypes.LOAD_STATE,
  orm,
})

export const updateSettings = (settings) => ({
  type: actionTypes.UPDATE_SETTINGS,
  settings,
})
