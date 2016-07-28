import { fromJS } from 'immutable'
import { routeActions } from 'react-router-redux'

const ACTION_HANDLERS = {}

// ------------------------------------
// Localization
// ------------------------------------

export const SET_LOCALE = 'SET_LOCALE'

export const setLocale = (lang) => {
  return {
    type: SET_LOCALE,
    payload: lang
  }
}

Object.assign(ACTION_HANDLERS, {
  [SET_LOCALE]: (state, { payload }) => {
    return state
      .set('locale', payload)
  }
})

export const goToUrl = (url) => {
  return (dispatch) => {
    dispatch(routeActions.push(url))
  }
}

// ------------------------------------
// Initial state
// ------------------------------------

const initialState = fromJS({
  isLoading: false
})

export default function registrationReducer (state, action) {
  state = state || initialState
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
