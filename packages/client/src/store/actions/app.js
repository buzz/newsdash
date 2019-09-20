export const actionTypes = {
  IMPORT_STATE: 'IMPORT_STATE',
  LOAD_STATE: 'LOAD_STATE',
  EDIT_APP: 'EDIT_APP',
}

export const importState = (data) => ({
  type: actionTypes.IMPORT_STATE,
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
