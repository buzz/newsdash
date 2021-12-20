export const actionTypes = {
  CLEAR_STATE: 'CLEAR_STATE',
  EDIT_APP: 'EDIT_APP',
  IMPORT_SETTINGS: 'IMPORT_SETTINGS',
  RESTORE_APP_SETTINGS: 'RESTORE_APP_SETTINGS',
  RESTORE_FEEDS: 'RESTORE_FEEDS',
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

export const restoreAppSettings = (data) => ({
  type: actionTypes.RESTORE_APP_SETTINGS,
  data,
})

export const restoreFeeds = (data) => ({
  type: actionTypes.RESTORE_FEEDS,
  data,
})
