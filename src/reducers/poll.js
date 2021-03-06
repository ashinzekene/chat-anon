import {
  // POLL_FAVORITED,
  // POLL_UNFAVORITED,
  POLL_PAGE_LOADED,
  POLL_PAGE_UNLOADED,
  POLL_VOTED,
  POLL_SELECTED
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case POLL_SELECTED: {
      return action.poll
    }
    case POLL_PAGE_LOADED: {
      return action.error? state : action.payload;
    }
    case POLL_PAGE_UNLOADED: {
      return {};
    }
    case POLL_VOTED: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
};
