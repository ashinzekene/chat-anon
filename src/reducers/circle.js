import { CIRCLE_PAGE_LOADED, CIRCLE_PAGE_UNLOADED, CIRCLE_FELLOW_ADDED, CIRCLE_FELLOW_REMOVED, CIRCLE_ADMIN_ADDED, CIRCLE_ADMIN_REMOVED, CIRCLE_SELECTED } from "../actions/index";



export default (state = {}, action) => {
  switch (action.type) {
    case CIRCLE_SELECTED: {
      return { state, ...action.payload }
    }
    case CIRCLE_PAGE_LOADED: {
      return { state, ...action.payload }
    }
    case CIRCLE_PAGE_UNLOADED: {
      return {}
    }
    case CIRCLE_FELLOW_ADDED: {
      return Object.assign({}, state, {
        fellows: state.fellows.push(action.payload)
      })
    }
    case CIRCLE_FELLOW_REMOVED: {
      return Object.assign({}, state, state.fellows.filter(id => id === action.payload))
    }
    case CIRCLE_ADMIN_ADDED: {
      return Object.assign({}, state, {
        admins: state.admins.push(action.payload)
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