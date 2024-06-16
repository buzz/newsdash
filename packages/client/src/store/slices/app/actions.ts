import appSlice from './appSlice'

const init = appSlice.createAction('init')

export const { changeHeaderVisibile, changeColorScheme, closeModal, openModal } = appSlice.actions
export { init }
