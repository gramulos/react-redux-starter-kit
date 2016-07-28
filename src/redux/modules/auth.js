import { fromJS } from 'immutable'

import api from '../middleware/api'
import { routeActions } from 'react-router-redux'

const ACTION_HANDLERS = {}

// ------------------------------------
// Actions
// ------------------------------------

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT = 'LOGOUT'

function loginRequest () {
  return {
    type: LOGIN_REQUEST
  }
}

function loginSuccess (details) {
  return {
    type: LOGIN_SUCCESS,
    payload: details
  }
}

function loginError (err) {
  return {
    type: LOGIN_ERROR,
    error: err
  }
}

function logOut () {
  return {
    type: LOGOUT
  }
}

export const login = (login, password) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(loginRequest())
      api.auth.login(login, password)
        .then(details => {
          localStorage.setItem('citrix', JSON.stringify(details.User.Token))
          dispatch(loginSuccess(details))
          dispatch(routeActions.push('/dashboard'))
        })
        .catch(err => {
          dispatch(loginError(err))
        })
    })
  }
}

export const loginIfRequired = (route) => {
  return (dispatch, getState) => {
    if (getState().auth && !getState().auth.get('loggedUser')) {
      const token = JSON.parse(localStorage.getItem('citrix'))

      if (token) {
        api.auth.verifyToken(token)
          .then(details => {
            dispatch(loginSuccess(details))
            route ? dispatch(routeActions.push(route)) : null
          })
          .catch(err => {
            localStorage.clear()
            dispatch(loginError(err))
            dispatch(routeActions.push('/login'))
          })
      } else {
        dispatch(routeActions.push('/login'))
      }
    }
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    localStorage.clear()
    dispatch(logOut())
    dispatch(routeActions.push('/login'))
  }
}

Object.assign(ACTION_HANDLERS, {
  [LOGIN_REQUEST]: (state) => {
    return state
      .set('isLoading', true)
  },

  [LOGIN_SUCCESS]: (state, { payload }) => {
    return state
      .set('isLoading', false)
      .set('loggedUser', fromJS(payload))
  },

  [LOGIN_ERROR]: (state, { error }) => {
    return state
      .set('isLoading', false)
      .set('error', error)
  },

  [LOGOUT]: (state, { error }) => {
    return state
      .remove('error', error)
      .remove('loggedUser', error)
  }
})

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = fromJS({
  isLoading: false
})

export default function registrationReducer (state, action) {
  state = state || initialState
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
