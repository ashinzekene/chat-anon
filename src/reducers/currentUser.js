import { LOGIN, SIGNUP, LOGOUT, APP_LOAD } from "../actions/index";

export default (state = {}, action) => {
  switch (action.type) {
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