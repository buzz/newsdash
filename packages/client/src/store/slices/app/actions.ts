import appSlice from './appSlice'

/** Initialize app */
export const appInit = appSlice.createAction('init')

export const { changeHeaderVisibile, closeModal, openModal, changeVersionInfo } = appSlice.actions
