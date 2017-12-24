import { PROFILE_PAGE_LOADED, SIGNUP, LOGIN, LOGOUT } from "../actions/index";

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
    case SIGNUP :
    case LOGIN: {
      return action.error ? state : action.payload;
    }
    case LOGOUT: {
      return {};
    }
    default: {
      return state;
    }
  }
}