export const actionTypes = {
  CLEAR_STATE: 'CLEAR_STATE',
  IMPORT_SETTINGS: 'IMPORT_SETTINGS',
  LOAD_STATE: 'LOAD_STATE',
  EDIT_APP: 'EDIT_APP',
}

export const clearState = () => ({
  type: actionTypes.CLEAR_STATE,
})

export const importSettings = (data) => ({
  type: actionTypes.IMPORT_SETTINGS,
  data,
})

export const loadState = (data) => ({
  type: actionTypes.LOAD_STATE,
  data,
})

export const editApp = (attrs) => ({
  type: actionTypes.EDIT_APP,
  attrs,
})
