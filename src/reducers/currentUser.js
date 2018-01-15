import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  APP_LOAD,
  MY_PROFILE_LOADED,
  EDIT_PROFILE
} from "../actions/index";

export default (state = {}, action) => {
  switch (action.type) {
    case MY_PROFILE_LOADED:
    case APP_LOAD:
    case SIGNUP:
    case LOGIN: {
      return action.payload || {}
    }
    case LOGOUT: {
      return {}
    }
    case EDIT_PROFILE: {
      return Object.assign({}, state, action.payload)
    }
    default: {
      return state
    }
  }
}