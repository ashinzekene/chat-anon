import { CIRCLE_CREATED, CIRCLE_DELETED, MY_CIRCLES_REQUESTED } from "../actions";

export default (state= [], action) => {
  switch (action.type) {
    case CIRCLE_CREATED: {
      return [ ...state, action.payload]
    }
    case CIRCLE_DELETED: {
      return Object.assign({}, state.filter(circle => circle._id === action.id ) ) 
    }
    case MY_CIRCLES_REQUESTED: {
      return action.error ? state: action.payload
    }
    default: {
      return state
    }
  }
}