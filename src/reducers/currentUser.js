import {
  LOGIN,
  SIGNUP,
  LOGOUT,
  APP_LOAD,
  MY_PROFILE_LOADED,
  FOLLOWERS_REQUESTED, 
  FOLLOWING_REQUESTED} from "../actions/index";

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
    case FOLLOWERS_REQUESTED: {
      return { ...state, followers: action.payload }
    }
    case FOLLOWING_REQUESTED: {
      return { ...state, following: action.payload }
    }
    default: {
      return state
    }
  }
}