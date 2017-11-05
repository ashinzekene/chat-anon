import { 
  POLL_CREATED, 
  POLL_DELETED,
  POLL_LIST_LOADED,
  POLL_LIST_UNLOADED
} from "../actions/pollActions";

export default (state = [], action) => {
  switch (action.type) {
    case POLL_LIST_LOADED: {
      return action.payload;
    }
    case POLL_LIST_UNLOADED: {
      return [];
    }
    case POLL_CREATED: {
      return [...state, action.payload]
    }
    case POLL_DELETED: {
      return state.filter(poll => poll._id === action.id);
    }
    default: {
      return state;
    }
  }
}