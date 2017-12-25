import { 
  CIRCLE_LIST_LOADED,
  CIRCLE_LIST_UNLOADED,
  CIRCLE_DELETED,
  CIRCLE_CREATED,
  CIRCLES_REQUESTED
} from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case CIRCLE_LIST_LOADED: {
      return action.error ? state :action.payload;
    }
    case CIRCLE_LIST_UNLOADED: {
      return [];
    }
    case CIRCLES_REQUESTED: {
      return action.error? state: action.payload;
    }
    case CIRCLE_CREATED: {
      return [...state, action.payload];
    }
    case CIRCLE_DELETED: {
      return state.filter(circle => circle._id === action.id);
    }
    default: {
      return state;
    }
  }
};
