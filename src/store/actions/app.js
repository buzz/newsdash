export const actionTypes = {
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
}

export const updateSettings = (settings) => ({
  type: actionTypes.UPDATE_SETTINGS,
  settings,
})
