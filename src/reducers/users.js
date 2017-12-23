import { USER_LIST_LOADED, USER_LIST_UNLOADED } from "../actions/index";

export default (state = [], action) => {
  switch (action.type) {
    case USER_LIST_LOADED: {
      return action.payload
    }
    case USER_LIST_UNLOADED: {
      return []
    }
    default: {
      return state
    }
  }
}