import axios from 'axios'
import { baseUrl } from './config'

export default function authApi () {
  return {
    login,
    verifyToken
  }

  function login (Username, Password) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + 'account/Login/', { Username, Password })
        .then(response => {
          response.data.ErrorCode === 0
          ? resolve(response.data)
          : reject(response.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  }

  function verifyToken (token) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + 'account/VerifyToken/', { token })
        .then(response => {
          response.data.ErrorCode === 0
          ? resolve(response.data)
          : reject(response.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  }
}
