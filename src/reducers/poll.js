import { 
  // POLL_FAVORITED,
  // POLL_UNFAVORITED,
  POLL_PAGE_LOADED,
  POLL_PAGE_UNLOADED,
  POLL_VOTED
} from '../actions/pollActions';

export default (state = {}, action) => {
  switch (action.type) {
    case POLL_PAGE_LOADED: {
      return action.payload;
    }
    case POLL_PAGE_UNLOADED: {
      return {};
    }
    case POLL_VOTED: {
      return Object.assign({}, state, state.options.map(option => {
        option.name === action.payload.name ? option.votes++ : null;
        return option;
      }))
    }
    default: {
      return state
    }
  }
}
