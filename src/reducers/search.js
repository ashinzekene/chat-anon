import { SEARCH_CIRCLES, SEARCH_POLLS, SEARCH_USERS } from "../actions/index";

const initialState = {
  polls: [],
  users: [],
  circles: []
}
export default (state= initialState, action) => {
  switch ( action.type ) {
    case SEARCH_CIRCLES: {
      return Object.assign({}, state, { circles: action.payload })
    }
    case SEARCH_POLLS: {
      return Object.assign({}, state, { polls: action.payload })
    }
    case SEARCH_USERS: {
      return Object.assign({}, state, { users: action.payload })
    }
    default: {
      return state
    }
  }
}