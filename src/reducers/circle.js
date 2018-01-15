import { 
  CIRCLE_PAGE_LOADED,
  CIRCLE_PAGE_UNLOADED,
  CIRCLE_FELLOW_ADDED,
  CIRCLE_FELLOW_REMOVED,
  CIRCLE_ADMIN_ADDED,
  CIRCLE_ADMIN_REMOVED,
  CIRCLE_SELECTED,
  CIRCLE_POLLS_REQUEST,
  CIRCLE_FELLOWS_REQUEST } from "../actions/index";


export default (state = {}, action) => {
  switch (action.type) {
    case CIRCLE_SELECTED: {
      return { state, ...action.payload }
    }
    case CIRCLE_PAGE_LOADED: {
      return action.error? state : { state, ...action.payload }
    }
    case CIRCLE_PAGE_UNLOADED: {
      return {}
    }
    case CIRCLE_POLLS_REQUEST: {
      return { ...state, polls: action.payload}
    }
    case CIRCLE_FELLOWS_REQUEST: {
      return { ...state, fellows: action.payload}
    }
    case CIRCLE_FELLOW_ADDED: {
      return Object.assign({}, state, {
        fellows: [ ...state.fellows, action.payload]
      })
    }
    case CIRCLE_FELLOW_REMOVED: {
      return Object.assign({}, state, state.fellows.filter(id => id === action.payload))
    }
    case CIRCLE_ADMIN_ADDED: {
      return Object.assign({}, state, {
        admins: [ ...state.admins, action.payload]
      })
    }
    case CIRCLE_ADMIN_REMOVED: {
      return Object.assign({}, state, state.admins.filter(id => id === action.payload))
    }
    default: {
      return state
    }
  }
}