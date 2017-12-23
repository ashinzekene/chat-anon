import { PROFILE_PAGE_UNLOADED, PROFILE_PAGE_LOADED } from "../actions/index";

export default (state = {}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED: {
      return action.error? state :action.payload
    }
    case PROFILE_PAGE_UNLOADED: {
      return {}
    }
    default: {
      return state
    }
  }
}