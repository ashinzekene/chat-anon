import { 
  CIRCLE_LIST_LOADED,
  CIRCLE_LIST_UNLOADED,
  CIRCLE_DELETED,
  CIRCLE_CREATED
} from '../actions';

export default (state = [], action) => {
  switch (action.type) {
    case CIRCLE_LIST_LOADED: {
      return action.payload;
    }
    case CIRCLE_LIST_UNLOADED: {
      return [];
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
