/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createSlice } from '@reduxjs/toolkit'
import { configureTransport } from '../../API/transport'
import { post } from '../../API/request'

const initialState = {
  accessToken: '',
  user: {},
  ava: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      configureTransport(action.payload.accessToken)
      state.accessToken = action.payload.accessToken
    },
    setUser: (state, action) => {
      state.user = action.payload || {}
    },
    setAva: (state, action) => {
      state.ava = action.payload
    },
  },
})

export const fetchLogin = (dispatch, { data, onSuccess = () => {}, onFailed = () => {} }) => {
  post('login/', data).then((response) => {
    dispatch(setTokens({
      accessToken: response.token,
    }))
    onSuccess(response.token)
  }).catch((error) => {
    onFailed(error)
  })
}

export const logout = (dispatch) => {
  dispatch(setTokens({
    accessToken: '',
    user: {},
    isAuth: false,
  }))
}

export const {
  setTokens, setRememberMe, setLoginData, setUser, setAva,
} = authSlice.actions

export default authSlice.reducer
