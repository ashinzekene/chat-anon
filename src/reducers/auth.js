import { SIGNUP, LOGIN, LOGIN_PAGE_UNLOADED, REGISTER_PAGE_UNLOADED, ASYNC_START } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case SIGNUP:
    case LOGIN: {
      return {
        ...state,
        inProgress: false,
        error: action.error,
        errors: action.errors
      }
    };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === SIGNUP) {
        return { ...state, inProgress: true };
      }
    default: {
      return state
    }
  }
}