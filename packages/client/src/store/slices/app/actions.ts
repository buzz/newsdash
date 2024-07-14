import appSlice from './appSlice'

const init = appSlice.createAction('init')

const importSettings = appSlice.createAction<string>('importSettings')

export const { changeHeaderVisibile, changeColorScheme, closeModal, openModal } = appSlice.actions
export { importSettings, init }
