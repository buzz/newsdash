export const actionTypes = {
  CLEAR_STATE: 'CLEAR_STATE',
  EDIT_APP: 'EDIT_APP',
  IMPORT_SETTINGS: 'IMPORT_SETTINGS',
  RESTORE_SETTINGS: 'RESTORE_SETTINGS',
}

export const clearState = () => ({
  type: actionTypes.CLEAR_STATE,
})

export const editApp = (attrs) => ({
  type: actionTypes.EDIT_APP,
  attrs,
})

export const importSettings = (data) => ({
  type: actionTypes.IMPORT_SETTINGS,
  data,
})

export const restoreSettings = (data) => ({
  type: actionTypes.RESTORE_SETTINGS,
  data,
})
