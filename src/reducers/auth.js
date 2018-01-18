import { SIGNUP, LOGIN, LOGIN_PAGE_UNLOADED, REGISTER_PAGE_UNLOADED, ASYNC_START, REMOVE_AUTH_ERROR } from "../actions";

let initialState = {
  errors: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
    case LOGIN: {
      return {
        ...state,
        inProgress: false,
        error: action.error,
        errors: action.errors
      }
    }
    case LOGIN_PAGE_UNLOADED:
    case REMOVE_AUTH_ERROR: {
      return Object.assign({}, state, { errors: state.errors.filter((err, i) => i !== action.key) })
    }
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