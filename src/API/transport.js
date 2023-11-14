import axios from 'axios'
import TokenStorage from './TokenStorage'
import { apiUrl } from './environment'

let transport

export const configureTransport = (token = null) => {
  const options = token || TokenStorage.getAccessToken()
    ? {
      baseURL: apiUrl,
      headers: {
        Authorization: `token ${token || TokenStorage.getAccessToken()}`,
      },
    }
    : { baseURL: apiUrl }

  console.log(options)
  transport = axios.create(options)
  return transport
}

export const getTransport = () => transport || configureTransport()
