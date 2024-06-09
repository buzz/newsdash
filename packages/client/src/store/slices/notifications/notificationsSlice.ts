import createSlice from '#store/createSlice'

import { hideNotification, notificationProcessed, showNotification } from './actions'
import notificationsEntityAdapter, { notificationsInitialState } from './notificationsEntityAdapter'

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: notificationsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    // Show notification
    builder.addCase(showNotification, (state, { payload: notification }) => {
      notificationsEntityAdapter.addOne(state, notification)
    })

    // Hide notification
    builder.addCase(hideNotification, (state, { payload: id }) => {
      notificationsEntityAdapter.addOne(state, { id, command: 'hide' })
    })

    // Remove notification that was handled by Mantine system
    builder.addCase(notificationProcessed, (state, { payload: id }) => {
      notificationsEntityAdapter.removeOne(state, id)
    })
  },
})

export default notificationsSlice
