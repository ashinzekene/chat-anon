import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  APP_LOAD,
  MY_PROFILE_LOADED
} from "../actions/index";

export default (state = {}, action) => {
  switch (action.type) {
    case MY_PROFILE_LOADED:
    case APP_LOAD:
    case SIGNUP:
    case LOGIN: {
      return action.payload
    }
    case LOGOUT: {
      return {}
    }
    default: {
      return state
    }
  }
}