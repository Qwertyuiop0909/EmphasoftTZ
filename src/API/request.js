import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTransport } from './transport'
import { logout } from '../redux/slices/auth'
import TokenStorage from './TokenStorage'

const generateHook = (callback) => () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return callback((err) => {
    TokenStorage.logOut()
    logout(dispatch)
    navigate('/login', { replace: true })
    throw err
  })
}

export const usePost = generateHook(() => (
  (path, payload, config) => getTransport()
    .post(`/${path}`, payload, config)
    .then((response) => response.data)
    .catch((err) => err.response.data)
))

export const useGet = generateHook((middleware) => (
  (path, token, config) => getTransport(token)
    .get(`/${path}`, config)
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        middleware(err)
      }
    })
))

export const usePut = generateHook(() => (
  (path, payload, config) => getTransport()
    .put(`/${path}`, payload, config)
    .then((response) => response.data)
    .catch((err) => err.response.data)
))

export const useDelete = generateHook(() => (
  (path, payload, config) => getTransport()
    .delete(`/${path}`, payload, config)
    .then((response) => response.data)
    .catch((err) => err.response.data)
))

export const post = async (path, payload, config) => getTransport()
  .post(`/${path}`, payload, config)
  .then((response) => response.data)
