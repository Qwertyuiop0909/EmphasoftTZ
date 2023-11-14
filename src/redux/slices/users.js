/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

export const {
  setUsers,
} = usersSlice.actions

export default usersSlice.reducer
