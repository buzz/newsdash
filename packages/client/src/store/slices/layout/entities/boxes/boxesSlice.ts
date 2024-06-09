import createSlice from '#store/createSlice'

import { boxesInitialState } from './boxesEntityAdapter'

const boxesSlice = createSlice({
  name: 'boxes',
  initialState: boxesInitialState,
  reducers: {},
})

export default boxesSlice
